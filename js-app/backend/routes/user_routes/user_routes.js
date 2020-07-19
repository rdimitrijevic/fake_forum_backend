const express = require('express');
const body_parser = require('body-parser');

const router = express.Router();

const { register_handler, login_handler } = require('./handlers');
const { username_val, gender_val, email_val, password_val } = require('../../validation/users_validation');

router.use(body_parser.json());
router.use(body_parser.urlencoded());

router.post(
    '/login',
    username_val,
    password_val,
    login_handler
);

router.post(
    '/register',
    username_val,
    password_val,
    email_val,
    gender_val,
    register_handler
);

router.get('/users/:id')

module.exports = router;
