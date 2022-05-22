const express = require('express');
const { Basic, Ability } = require('../models');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');

module.exports = router;
