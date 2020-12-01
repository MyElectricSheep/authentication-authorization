const express = require('express');
const authenticationRouter = express.Router();

const userAuthenticationController = require('../controllers/userAuthenticationController')
const adminAuthenticationController = require('../controllers/adminAuthenticationController')
const transporterAuthenticationController = require('../controllers/transporterAuthenticationController')

// POST /auth/login
authenticationRouter.post('/user/login', userAuthenticationController.login)
authenticationRouter.post('/admin/login', adminAuthenticationController.login)
authenticationRouter.post('/transporter/login', transporterAuthenticationController.login)

module.exports = authenticationRouter;
