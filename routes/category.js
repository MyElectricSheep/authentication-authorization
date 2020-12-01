const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController')

catgoryRouter.get('/:id', categoryController.getOne);
catgoryRouter.get('/', catgeoryController.getAll);
catgoryRouter.post('/', catgeoryController.create);
catgoryRouter.put('/:id', catgeoryController.update);
catgoryRouter.delete('/:id', catgeoryController.delete);

module.exports = catgoryRouter;