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

  listOfRole: async (req, res, next) => {
    try {
      const listOfRoleQry = path.join(
        __dirname,
        '../../sql/RoleRight/listOfRole.sql',
      );

      const listOfRole = await executeQuery(listOfRoleQry);

      if (listOfRole.length > 0) {
        transformedResources = listOfRole.map((role) => {
          const isactive = role.isactive[0] === 1 ? 1 : 0;
          return { ...role, isactive };
        });
        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.LIST_OF_ROLE, transformedResources));
      } else {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.ROLE_NOT_FOUND, {}));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  getSingleRole: async (req, res, next) => {
    try {
      const { id } = req.query;
      const getSingleRoleQry = path.join(
        __dirname,
        '../../sql/RoleRight/getSingleRole.sql',
      );

      const getSingleRole = await executeQuery(getSingleRoleQry, { id });

      if (getSingleRole.length > 0) {
        transformedResources = getSingleRole.map((role) => {
          const isactive = role.isactive[0] === 1 ? 1 : 0;
          return { ...role, isactive };
        });
        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.ROLE_DETAIL, transformedResources[0]));
      } else {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.ROLE_NOT_FOUND, {}));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  deleteRole: async (req, res, next) => {
    try {
      const { id } = req.query;
      const { status } = req.body;
      let isactive = 0;
      let msg=message.ROLE_DEACTIVE
      if (status) {
        isactive = 1;
        msg=message.ROLE_ACTIVE
      }
      const deleteRoleQry = path.join(
        __dirname,
        '../../sql/RoleRight/deleteRole.sql',
      );

      const deleteRole = await executeQuery(deleteRoleQry, { id,isactive });

      console.log('deleteRole-->', deleteRole);

      return res
        .status(StatusCodes.OK)
        .send(getResponse(1, msg, {}));
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  updateRole: async (req, res, next) => {
    try {
      const { id } = req.query;
      const { rolename } = req.body;

      const updateExistRoleQry = path.join(
        __dirname,
        '../../sql/RoleRight/updateExistRole.sql',
      );

      const existRole = await executeQuery(updateExistRoleQry, {
        id,
        rolename,
      });

      console.log('existRole-->', existRole);
      if (existRole.length > 0) {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.ROLE_EXIST, {}));
      } else {
        const updateRoleQry = path.join(
          __dirname,
          '../../sql/RoleRight/updateRole.sql',
        );

        const updateRole = await executeQuery(updateRoleQry, {
          id,
          rolename,
        });

        console.log('updateRole-->', updateRole);

        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.ROLE_UPDATE, {}));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  createRoleRight: async (req, res, next) => {
    try {
      const { roleid, userRight } = req.body;
      const { userId } = req.user;

      const arr = [];
      for (let i = 0; i < userRight.length; i++) {
        arr.push({
          roleid: roleid,
          rightid: userRight[i].rightid,
          isview: userRight[i].isview,
          isdelete: userRight[i].isdelete,
          isupdate: userRight[i].isupdate,
          iscreate: userRight[i].iscreate,
          createdby: userId,
        });
      }

      const insertRoleRightQry = path.join(
        __dirname,
        '../../sql/RoleRight/insertRoleRight.sql',
      );

      arr.map(async (item) => {
        const insertRoleRight = await executeQuery(insertRoleRightQry, item);

        console.log(insertRoleRight);
      });

      return res
        .status(StatusCodes.OK)
        .send(getResponse(1, message.ROLE_RIGHT_ADDED, {}));
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  viewRoleRight: async (req, res, next) => {
    try {
      const { userId } = req.user;

      const { id } = req.query;

      const viewRoleRightQry = path.join(
        __dirname,
        '../../sql/RoleRight/viewRoleRight.sql',
      );

      const viewRoleRight = await executeQuery(viewRoleRightQry, {
        id,
      });

      if (viewRoleRight.length > 0) {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.LIST_OF_RIGHT, viewRoleRight));
      } else {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.RIGHT_NOT_ASSIGNED, {}));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },

  viewRight: async (req, res, next) => {
    try {
      const viewRightQry = path.join(
        __dirname,
        '../../sql/RoleRight/listOfRights.sql',
      );

      const viewRight = await executeQuery(viewRightQry);

      if (viewRight.length > 0) {
        transformedResources = viewRight.map((right) => {
          const isfunction =
            right.isfunction === null
              ? null
              : right.isfunction[0] === 1
              ? 1
              : 0;

          const islist =
            right.islist === null ? null : right.islist[0] === 1 ? 1 : 0;
          const isform =
            right.isform === null ? null : right.isform[0] === 1 ? 1 : 0;

          return { ...right, isfunction, islist, isform };
        });

        return res
          .status(StatusCodes.OK)
          .send(getResponse(1, message.LIST_OF_RIGHTS, transformedResources));
      } else {
        return res
          .status(StatusCodes.OK)
          .send(getResponse(0, message.RIGHT_NOT_FOUND, {}));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getResponse(0, message.INTERNAL_SERVER_ERROR, []));
    }
  },
};

module.exports = { roleRightService };
