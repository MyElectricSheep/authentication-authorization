const express = require('express');
const authenticationRouter = express.Router();

const userAuthenticationController = require('../controllers/userAuthenticationController')
const adminAuthenticationController = require('../controllers/adminAuthenticationController')
const transporterAuthenticationController = require('../controllers/transporterAuthenticationController')

// POST /auth/login
userAuthenticationRouter.post('/login', userAuthenticationController.login)
adminAuthenticationRouter.post('/login', adminAuthenticationController.login)
transporterAuthenticationRouter.post('/login', transporterAuthenticationController.login)

module.exports = authenticationRouter;
