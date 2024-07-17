const { userService } = require('../services/userService');
const getResponse = require('../utils/utils');
const { StatusCodes } = require('http-status-codes');
const message = require('../utils/message');

module.exports = {
  signUp: async (req, res) => {
    try {
      return await userService.registerService(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },
  verifyEmail: async (req, res) => {
    try {
      return await userService.verifyEmail(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  updatePassword: async (req, res) => {
    try {
      return await userService.updatePassword(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  login: async (req, res) => {
    try {
      return await userService.login(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  viewProfile: async (req, res) => {
    try {
      return await userService.viewProfile(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },
};
