// Routes for Users

const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController')
const authorizeUser = require('../middlewares/authorizeUser')

const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeTransporter = require('../middlewares/authorizeTransporter')

userRouter.get('/', authorizeUser, authorizeAdmin, userController.getAll) // get all users
userRouter.get('/:id', authorizeTransporter, authorizeAdmin, userController.getOne) // get one user
userRouter.post('/', authorizeUser, authorizeAdmin, userController.createUser) // create a user
userRouter.put('/', authorizeUser, authorizeAdmin, userController.updateUser) // update a user
userRouter.delete('/all', authorizeUser, authorizeAdmin, userController.deleteUser) // delete all users
userRouter.delete('/:id', authorizeUser, authorizeAdmin, userController.deleteUser) // delete a user
// userRouter.delete('/:id/orders', authorizeUser, authorizeAdmin, userController.getOrdersUser) 

module.exports = userRouter;
