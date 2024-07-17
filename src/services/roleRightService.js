const { StatusCodes } = require('http-status-codes');
const message = require('../utils/message');
const getResponse = require('../utils/utils');
const path = require('path');
const { executeQuery } = require('../utils/query');

const roleRightService = {
  createRole: async (req, res, next) => {
    try {
      const { rolename } = req.body;
      const { userId } = req.user;

      const roleExistQry = path.join(
        __dirname,
        '../../sql/RoleRight/checkExistingRole.sql',
      );

      const roleExist = await executeQuery(roleExistQry, {
        rolename,
      });

      if (roleExist.length > 0) {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.ROLE_EXIST, {}));
      }

      const addRoleQry = path.join(
        __dirname,
        '../../sql/RoleRight/createRole.sql',
      );

      const createRole = await executeQuery(addRoleQry, {
        userId,
        rolename,
      });

      console.log('createRole-->', createRole);

      return res
        .status(StatusCodes.OK)
        .send(getResponse(1, message.ROLE_CREATED, {}));
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  createRoleRight: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },
};

module.exports = { roleRightService };
