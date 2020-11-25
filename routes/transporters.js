const express = require('express');
const transporterRouter = express.Router();
const transporterController = require('../controllers/transporterController')
const authorizeTransporter = require('../middlewares/authorizeTransporter')

transporterRouter.get('/', authorizeTransporter, transporterController.list_transporters)
transporterRouter.get('/:id', transporterController.find_transporter)
transporterRouter.post('/', authorizeTransporter, transporterController.create_transporter)
transporterRouter.put('/', authorizeTransporter, transporterController.update_transporter)
transporterRouter.delete('/all', authorizeTransporter, transporterController.delete_transporters)
transporterRouter.delete('/:id', authorizeTransporter, transporterController.delete_transporter)

module.exports = transporterRouter;