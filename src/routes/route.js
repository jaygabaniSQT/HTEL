const express = require('express');
const router = express();

router.use('/api/user', require('./route/userRoute'));

module.exports = router;
