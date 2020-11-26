const express = require('express');
const transporterRouter = express.Router();
const transporterController = require('../controllers/transporterController')

const authorizeTransporter = require('../middlewares/authorizeTransporter')
const authorizeAdmin = require('../middlewares/authorizeAdmin')

transporterRouter.get('/', authorizeTransporter, authorizeAdmin, transporterController.list_transporters)
transporterRouter.get('/:id', transporterController.find_transporter)
transporterRouter.post('/', authorizeTransporter, authorizeAdmin, transporterController.create_transporter)
transporterRouter.put('/', authorizeTransporter, authorizeAdmin, transporterController.update_transporter)
transporterRouter.delete('/all', authorizeTransporter, authorizeAdmin, transporterController.delete_transporters)
transporterRouter.delete('/:id', authorizeTransporter, authorizeAdmin, transporterController.delete_transporter)

module.exports = transporterRouter;