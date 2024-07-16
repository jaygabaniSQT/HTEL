const { StatusCodes } = require('http-status-codes');
const getResponse = require('../utils/utils');
const bcrypt = require('bcrypt');
const path = require('path');
const salt = 10;
const { executeQuery, EncryptData, DecryptData } = require('../utils/query');
const { sendEmail } = require('../utils/sendEmail');
const message = require('../utils/message');

const userService = {
  registerService: async (req, res, next) => {
    try {
      console.log('------------------------------');
      const { fname, lname, emailid, mobileno } = req.body;

      const checkEmailExists = await userService.checkEmailExists(emailid);
      console.log(checkEmailExists, 'checkexistemail');
      if (checkEmailExists) {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.EMAIL_EXIST, {}));
      }

      if (req.file) {
        const timestamp = Date.now();

        const imagefromreq = req.file;
        const imbody = imagefromreq?.buffer;

        const imagename = imagefromreq.originalname;

        // uploadFile(timestamp, "odhani", imagefromreq?.mimetype, imbody);

        // var image = `https://odhani.s3.ap-south-1.amazonaws.com/agency/${timestamp}`;
      } else {
        var image = '';
      }
      const params = {
        username: `${fname} ${lname}`,
        fname,
        lname,
        emailid,
        mobileno,
        photo: image,
      };

      const addUserQry = path.join(__dirname, '../../sql/User/insertUser.sql');

      const addUser = await executeQuery(addUserQry, params);

      console.log('addUser-->', addUser.insertId);

      const updateAssociationidQry = path.join(
        __dirname,
        '../../sql/User/updateAssociationid.sql',
      );

      const updateUserId = await executeQuery(updateAssociationidQry, {
        userId: addUser.insertId,
      });

      console.log('updateUserId-->', updateUserId);

      const hashedmail = encodeURIComponent(EncryptData(emailid));

      console.log('hashedmail-->', hashedmail);

      const html = `<p>Hi, ${
        fname + ' ' + lname
      } </p><p>Great to have you on board! <br><br>
      Click here to set your password:<b> <a href="${'fronurl'}/updatepassword/e/${hashedmail}">Set Password</a></b>. 
      If you need help, we\'re just an email away.</p>`;

      sendEmail(emailid, 'Welcome to HTEL', html);

      return res
        .status(StatusCodes.OK)
        .send(getResponse(1, message.REGISTER_SUCCESS, {}));
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  checkEmailExists: async (emailid) => {
    try {
      const sqlFilePath = path.join(
        __dirname,
        '../../sql/User/CheckExistingUserEmailExists.sql',
      );

      const checkEmailExists = await executeQuery(sqlFilePath, {
        emailid,
      });

      if (checkEmailExists.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const { emailid } = req.body;
      const encryptedemail = decodeURIComponent(emailid);

      const decryptedemail = DecryptData(encryptedemail);

      console.log('decryptedemail-->', decryptedemail);

      const checkEmailExists = await userService.checkEmailExists(
        decryptedemail,
      );
      console.log(checkEmailExists, 'checkexistemail');
      if (checkEmailExists) {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.EMAIL_VERIFY, {}));
      } else {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.USER_NOT_FOUND, {}));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  updatePassword: async (req, res, next) => {
    try {
      let apiEndPoint = req._parsedUrl.pathname.split('/');
      apiEndPoint = apiEndPoint[apiEndPoint.length - 1];
      console.log('apiEndPoint-->', apiEndPoint);
      let msg = message.UPDATE_PASSWORD;
      if (apiEndPoint == 'setpassword') {
        msg = message.SET_PASSWORD;
      }

      const { emailid, password } = req.body;
      const encryptedemail = decodeURIComponent(emailid);

      const decryptedemail = DecryptData(encryptedemail);
      const hashPassword = await bcrypt.hash(password, salt);

      const updatePasswordQry = path.join(
        __dirname,
        '../../sql/User/updatePassword.sql',
      );

      const checkEmailExists = await executeQuery(updatePasswordQry, {
        emailid: decryptedemail,
        password: hashPassword,
      });
      console.log('checkEmailExists-->', checkEmailExists);
      return res.status(StatusCodes.OK).send(getResponse(1, msg, {}));
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  login: async (req, res, next) => {
    try {
      const { emailid, password } = req.body;

      const checkEmailExists = await userService.checkEmailExists(emailid);

      if (checkEmailExists) {
        const loginQry = path.join(__dirname, '../../sql/User/login.sql');

        const getPassword = await executeQuery(loginQry, {
          emailid,
        });

        console.log('getPassword-->', getPassword);

        if (getPassword[0].password == null) {
          console.log(error);
          return res
            .status(StatusCodes.OK)
            .send(getResponse(0, message.SET_PASSWORD, {}));
        }

        const comparePassword = await bcrypt.compare(
          password,
          getPassword[0].password,
        );

        console.log('comparePassword-->', comparePassword);

        const transformedResources = getPassword.map((user) => {
          delete user.password;
          const isactive = user.isactive[0] === 1 ? 1 : 0;
          const isblock = user.isblock[0] === 1 ? 1 : 0;
          return { ...user, isactive, isblock };
        });

        if (comparePassword) {
          return res
            .status(StatusCodes.OK)
            .send(getResponse(1, message.LOGIN_SUCCESS, transformedResources));
        } else {
          return res
            .status(StatusCodes.OK)
            .send(getResponse(0, message.ENTER_VALID_PASSWORD, {}));
        }
      } else {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.USER_NOT_FOUND, {}));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },
};

module.exports = { userService };
