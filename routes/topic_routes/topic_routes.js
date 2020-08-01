const express = require('express');
const body_parser = require('body-parser');
const auth = require('../../auth/auth');

const topic = require('./topic_handlers');
const topic_val = require('../../validation/topics_validation');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));

/**
 * Route for fetching all
 * single users topics.
 */
router.get(
    '/:user_id',
    topic.get_by_user_handler
);

/**
 * Route for creating a new topic.
 * Requires authorization.
 */
router.post(
    '/',
    auth.user_auth,
    topic_val.create_validation,
    topic.create_handler
);

/**
 * Route for updating topics.
 * Requires authorization.
 */
router.put(
    '/:id',
    auth.user_auth,
    auth.topics_auth,
    topic_val.update_validation,
    topic.update_handler
);

/**
 * Route for fetching all topics
 */
router.get(
    '/',
    topic.get_all_handler
)

module.exports = router;