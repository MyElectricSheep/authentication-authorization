// Routes for Seeds

const express = require('express');
const seedRouter = express.Router();
const seedController = require('../controllers/seedController');
const userController = require('../controllers/userController');
const transporterController = require('../controllers/transporterController');
// const transporterController = require('../controllers/transporterController');


seedRouter.get('/recreate', seedController.create)
seedRouter.post('/create', seedController.create);
seedRouter.post('/', seedController.seed);
seedRouter.delete('/destroy', seedController.create)

module.exports = seedRouter;
