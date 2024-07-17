const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { createRole } = require('../../controllers/roleRightController');
const { verifyToken } = require('../../utils/auth');

router.post('/createrole', verifyToken, createRole);

module.exports = router;
