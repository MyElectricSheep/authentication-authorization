// Job Contract routes

const express = require('express');
const contractRouter = express.Router();
const contractController = require('../controllers/contractController')
const authorizeUser = require('../middlewares/authorizeUser')

const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeTransporter = require('../middlewares/authorizeTransporter')

contractRouter.get('/', authorizeUser, authorizeTransporter, authorizeAdmin, contractController.getAll) // get all contracts
contractRouter.get('/:id', authorizeUser, authorizeTransporter, authorizeAdmin, contractController.getOne) // get one contract
contractRouter.post('/', authorizeUser, authorizeAdmin, contractController.awardContract) // award a contract
contractRouter.delete('/all', authorizeUser, authorizeAdmin, contractController.deleteAllContracts) // delete all users
contractRouter.delete('/:id', authorizeUser, authorizeAdmin, contractController.deleteContract) // delete a user


module.exports = contractRouter;
