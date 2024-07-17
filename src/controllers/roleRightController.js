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
};
