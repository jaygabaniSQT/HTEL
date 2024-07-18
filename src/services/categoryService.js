const { StatusCodes } = require('http-status-codes');
const message = require('../utils/message');
const getResponse = require('../utils/utils');
const path = require('path');
const { executeQuery } = require('../utils/query');
const { v1: uuidv1 } = require('uuid');
const { deleteCategory } = require('../controllers/categoryController');

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

  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.query;
      const { status } = req.body;
      let msg = message.CATEGORY_DEACTIVE,
        isactive = 0;
      if (status) {
        isactive = 1;
        msg = message.CATEGORY_ACTIVE;
      }
      const updateCategoryQry = path.join(
        __dirname,
        '../../sql/Category/deleteCategory.sql',
      );

      const updateCategory = await executeQuery(updateCategoryQry, {
        id,
        isactive,
      });

      console.log('updateCategory-->', updateCategory);

      return res.status(StatusCodes.OK).send(getResponse(1, msg, {}));
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { id } = req.query;
      const { name, details } = req.body;

      const existCategoryQry = path.join(
        __dirname,
        '../../sql/Category/updateCategoryExist.sql',
      );

      const existCategory = await executeQuery(existCategoryQry, { id, name });

      console.log('existCategory-->', existCategory);
      if (existCategory.length > 0) {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.CATEGORY_EXIST, {}));
      } else {
        const updateCategoryQry = path.join(
          __dirname,
          '../../sql/Category/updateCategory.sql',
        );

        const updateCategory = await executeQuery(updateCategoryQry, {
          id,
          name,
          details,
          updatedby: userId,
        });

        console.log('updateCategory-->', updateCategory);

        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.CATEGORY_UPDATE, {}));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  listOfCategory: async (req, res, next) => {
    try {
      const listOfCategoryQry = path.join(
        __dirname,
        '../../sql/Category/listCategory.sql',
      );

      const listOfCategory = await executeQuery(listOfCategoryQry);

      console.log('listOfCategory-->', listOfCategory);

      const transformedResources = listOfCategory.map((category) => {
        const isactive = category.isactive[0] === 1 ? 1 : 0;
        return { ...category, isactive };
      });

      if (listOfCategory.length > 0) {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.CATEGORY_LIST, transformedResources));
      } else {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.CATEGORY_NOT_FOUND, listOfCategory));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  getSingleCategory: async (req, res, next) => {
    try {
      const { id } = req.query;
      const listOfCategoryQry = path.join(
        __dirname,
        '../../sql/Category/getSingleCategory.sql',
      );

      const listOfCategory = await executeQuery(listOfCategoryQry, { id });

      console.log('listOfCategory-->', listOfCategory);

      const transformedResources = listOfCategory.map((category) => {
        const isactive = category.isactive[0] === 1 ? 1 : 0;
        return { ...category, isactive };
      });

      if (listOfCategory.length > 0) {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.CATEGORY_DETAIL, transformedResources[0]));
      } else {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.CATEGORY_NOT_FOUND, listOfCategory));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },
};

module.exports = { categoryService };
