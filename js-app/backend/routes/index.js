const express = require('express');
const User = require('./user_routes/user_routes');

const router = express();

router.use('/user', User);

module.exports = router;