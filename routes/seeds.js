// Routes for Seeds

const express = require('express');
const seedRouter = express.Router();
const seedController = require('../controllers/seedController');
const userController = require('../controllers/userController');
const transporterController = require('../controllers/transporterController');


seedRouter.get('/recreate', seedController.recreate, userController.getAll, transporterController.getAll)
seedRouter.post('/create', seedController.create);
seedRouter.post('/', seedController.seed);
seedRouter.delete('/destroy', seedController.destroy)

module.exports = seedRouter;
