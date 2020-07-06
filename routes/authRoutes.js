const express = require('express');

const router = express.Router();

const { postSignup, postLogin } = require('../controllers/authController');

// These routes comes under 'auth' namespace
router.post('/signup', postSignup);

router.post('/login', postLogin);

module.exports = router;