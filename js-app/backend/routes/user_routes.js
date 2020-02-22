const express = require('express');
const jwt = require('json-web-token');
const body_parser = require('body-parser');


const router = new express.Router();

router.use(body_parser.json());
router.use(body_parser.urlencoded());

router.post('/log-in', () => console.log('login'));
router.post('/register', () => console.log('register'));



