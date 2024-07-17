const { StatusCodes } = require('http-status-codes');
const message = require('../utils/message');
const getResponse = require('../utils/utils');
const path = require('path');
const { executeQuery } = require('../utils/query');
const { v1: uuidv1 } = require('uuid');

const categoryService = {
  createCategory: async (req, res, next) => {
    try {
      const { name, details } = req.body;
      const { userId } = req.user;

      const existCategoryQry = path.join(
        __dirname,
        '../../sql/Category/categoryExist.sql',
      );

      const existCategory = await executeQuery(existCategoryQry, { name });

      if (existCategory.length > 0) {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.CATEGORY_EXIST, {}));
      }

      const params = {
        name,
        details,
        code: uuidv1(),
        createdby: userId,
      };

      const addCategoryQry = path.join(
        __dirname,
        '../../sql/Category/insertCategory.sql',
      );

      const addCategory = await executeQuery(addCategoryQry, params);

      console.log('addCategoryQry-->', addCategory);

      return res
        .status(StatusCodes.OK)
        .send(getResponse(1, message.CATEGORY_ADDED, {}));
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },
};

module.exports = { categoryService };
