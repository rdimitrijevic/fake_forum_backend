const express = require('express');
const body_parser = require('body-parser');
const auth = require('../../auth/auth');

const post = require('./post_handlers');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));


/**
 *
 * Route for fetching all posts
 * for a single topic.
 */
router.get(
    '/:topic_id',
    post.get_by_topic_handler
);

/**
 *
 * Route for posting a comment
 * to a topic.
 */
router.post(
    '/:topic_id',
    auth.user_auth,
    post.create_handler
);

/**
 *
 * Route for editing content
 * of a single post.
 */
router.put(
    '/:post_id',
    auth.user_auth,
    auth.posts_auth,
    post.update_handler
);

router.delete(
    '/:post_id',
    auth.user_auth,
    auth.posts_auth,
    post.delete_handler
)

module.exports = router;