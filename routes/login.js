// Login with different access routes

const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controllers/loginController');

loginRouter.get('/', loginController.get)
loginRouter.post('/logpost', loginController.post)



module.exports = loginRouter;