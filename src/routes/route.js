const express = require('express');
const router = express();

router.use('/api/user', require('./route/userRoute'));

router.use('/api/role', require('./route/roleRightRoute'));

module.exports = router;
