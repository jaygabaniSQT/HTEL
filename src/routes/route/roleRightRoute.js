const express = require('express');
const router = express.Router();
const {
  createRole,
  createRoleRight,
  viewRoleRight,
  viewRight,
  listOfRole,
  updateRole,
  getSingleRole,
  deleteRole,
} = require('../../controllers/roleRightController');
const { verifyToken, isAdmin } = require('../../utils/auth');

router.post('/createrole', verifyToken, isAdmin, createRole);

router.get('/listofrole', verifyToken, isAdmin, listOfRole);

router.post('/updateRole', verifyToken, isAdmin, updateRole);

router.get('/getSingleRole', verifyToken, isAdmin, getSingleRole);

router.post('/deleteRole', verifyToken, isAdmin, deleteRole);

router.get('/viewright', verifyToken, isAdmin, viewRight);

router.post('/createroleright', verifyToken, isAdmin, createRoleRight);

router.get('/viewroleright', verifyToken, isAdmin, viewRoleRight);

module.exports = router;
