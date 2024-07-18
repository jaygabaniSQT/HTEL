const { roleRightService } = require('../services/roleRightService');
const getResponse = require('../utils/utils');
const { StatusCodes } = require('http-status-codes');
const message = require('../utils/message');

module.exports = {
  createRole: async (req, res) => {
    try {
      return await roleRightService.createRole(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  listOfRole: async (req, res) => {
    try {
      return await roleRightService.listOfRole(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },


  getSingleRole:async (req, res) => {
    try {
      return await roleRightService.getSingleRole(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  updateRole: async (req, res) => {
    try {
      return await roleRightService.updateRole(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },


  deleteRole:async (req, res) => {
    try {
      return await roleRightService.deleteRole(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  createRoleRight: async (req, res) => {
    try {
      return await roleRightService.createRoleRight(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  viewRoleRight: async (req, res) => {
    try {
      return await roleRightService.viewRoleRight(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  listOfRight: async (req, res) => {
    try {
      return await roleRightService.viewRoleRight(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  viewRight: async (req, res) => {
    try {
      return await roleRightService.viewRight(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },
};
