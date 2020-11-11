const express = require('express');
const authenticationRouter = express.Router();

const authenticationController = require('../controllers/authenticationController')

// POST /auth/login
authenticationRouter.post('/login', authenticationController.login)

module.exports = authenticationRouter;
