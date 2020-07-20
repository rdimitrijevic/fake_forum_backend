const express = require('express');
const body_parser = require('body-parser');

const router = express.Router();

const { register_handler, login_handler, update_handler } = require('./handlers');
const { login_validation, register_validation, update_validation } = require('../../validation/users_validation');

router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));

router.post(
    '/login',
    login_validation,
    login_handler
);

router.post(
    '/register',
    register_validation,
    register_handler
);

router.put(
    '/:id',
    update_validation,
    update_handler
);

/*
router.get('/:id')
 */
module.exports = router;
