const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  signUp,
  verifyEmail,
  updatePassword,login
} = require('../../controllers/userController');

router.post('/register', upload.single('photo'), signUp);

router.post('/verifyemail', verifyEmail);

router.post('/setpassword', updatePassword);

router.post('/login', login);


module.exports = router;
