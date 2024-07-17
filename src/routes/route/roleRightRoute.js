const express = require('express');
const router = express.Router();
const {
  createRole,
  createRoleRight,
} = require('../../controllers/roleRightController');
const { verifyToken, isAdmin } = require('../../utils/auth');

router.post('/createrole', verifyToken, isAdmin, createRole);

router.post('/createroleright', verifyToken, isAdmin, createRoleRight);

module.exports = router;
