const express = require('express');
const transporterRouter = express.Router();
const transporterController = require('../controllers/transporterController')

const authorizeTransporter = require('../middlewares/authorizeTransporter')
const authorizeAdmin = require('../middlewares/authorizeAdmin')

transporterRouter.get('/', authorizeTransporter, authorizeAdmin, transporterController.getAll)
transporterRouter.get('/:id', transporterController.getOne)
transporterRouter.post('/', authorizeTransporter, authorizeAdmin, transporterController.createTransporter)
transporterRouter.put('/', authorizeTransporter, authorizeAdmin, transporterController.updateTransporter)
transporterRouter.delete('/all', authorizeTransporter, authorizeAdmin, transporterController.deleteTransporters)
transporterRouter.delete('/:id', authorizeTransporter, authorizeAdmin, transporterController.deleteTransporter)

module.exports = transporterRouter;