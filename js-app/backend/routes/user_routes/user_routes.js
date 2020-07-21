const express = require('express');
const body_parser = require('body-parser');

const router = express.Router();

const user = require('./handlers');
const user_val = require('../../validation/users_validation');
const auth = require('../../auth/user_auth');

router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));

router.post(
    '/login',
    user_val.login_validation,
    user.login_handler
);

router.post(
    '/register',
    user_val.register_validation,
    user.register_handler
);

router.put(
    '/',
    auth.authorized,
    user_val.update_validation,
    user.update_handler
);

/*
router.get('/:id')
 */

module.exports = router;
