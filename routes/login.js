// Login with different access routes

const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.get)
router.post('/logpost', loginController.post)



module.exports = loginRouter;