const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  signUp,
  verifyEmail,
  updatePassword,
  login,
  viewProfile,
} = require('../../controllers/userController');
const { verifyToken, isAdmin } = require('../../utils/auth');

router.post('/register', verifyToken, isAdmin, upload.single('photo'), signUp);

router.post('/verifyemail', verifyEmail);

router.post('/setpassword', updatePassword);

router.post('/updatepassword', updatePassword);

router.post('/login', login);

router.get('/viewProfile', verifyToken, viewProfile);

module.exports = router;
