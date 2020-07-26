const express = require('express');
const User = require('./user_routes/user_routes');
const Topic = require('./topic_routes/topic_routes');

const router = express();

router.use('/users', User);
router.use('/topics', Topic);

module.exports = router;