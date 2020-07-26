const express = require('express');
const body_parser = require('body-parser');

const router = express.Router();

const auth = require('../../auth/auth');
const topic = require('./topic_handlers');

router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));

/**
 * Route for fetching a single topic
 * using its ID.
 */
router.get('/:id');

/**
 * Route for creating a new topic.
 * Requires authorization.
 */
router.post(
    '/',
    auth.user_auth,
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