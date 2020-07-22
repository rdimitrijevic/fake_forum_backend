const express = require('express');
const body_parser = require('body-parser');

const router = express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));

/**
 * @description Route for fetching all topics
 */
router.get('/');

/**
 * @description Route for fetching a single topic
 * using its ID.
 */
router.get('/:id');

/**
 * @description Route for creating a new topic.
 * Requires authorization.
 */
router.post('/');
