const { categoryService } = require('../services/categoryService');
const getResponse = require('../utils/utils');
const { StatusCodes } = require('http-status-codes');
const message = require('../utils/message');

module.exports = {
  createCategory: async (req, res) => {
    try {
      return await categoryService.createCategory(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  deleteCategory: async (req, res) => {
    try {
      return await categoryService.deleteCategory(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  updateCategory: async (req, res) => {
    try {
      return await categoryService.updateCategory(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  listOfCategory: async (req, res) => {
    try {
      return await categoryService.listOfCategory(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },
};
