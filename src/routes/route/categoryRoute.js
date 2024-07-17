const express = require('express');
const router = express.Router();
const { createCategory } = require('../../controllers/categoryController');
const { verifyToken, isAdmin } = require('../../utils/auth');

router.post('/createCategory', verifyToken, isAdmin, createCategory);

module.exports = router;
