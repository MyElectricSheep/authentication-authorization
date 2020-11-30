const express = require('express');
const cityRouter = express.Router();
const cityController = require('../controllers/cityController')


cityRouter.get('/:id', cityController.getOne);
cityRouter.get('/', cityController.getAll);
cityRouter.post('/', cityController.create);
cityRouter.put('/:id', cityController.update);
cityRouter.delete('/:id', cityController.delete);

module.exports = cityRouter;