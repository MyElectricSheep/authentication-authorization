const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController')
const authorizeUser = require('../middlewares/authorizeUser')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeTransporter = require('../middlewares/authorizeTransporter')

userRouter.get('/', authorizeUser, authorizeAdmin, userController.list_users)
userRouter.get('/:id', authorizeTransporter, authorizeAdmin,userController.find_user)
userRouter.post('/', authorizeUser, authorizeAdmin, userController.create_user)
userRouter.put('/', authorizeUser, authorizeAdmin, userController.update_user)
userRouter.delete('/all', authorizeUser, authorizeAdmin, userController.delete_users)
userRouter.delete('/:id', authorizeUser, authorizeAdmin, userController.delete_user)

module.exports = userRouter;
