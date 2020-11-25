const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController')
const authorizeUser = require('../middlewares/authorizeUser')

userRouter.get('/', authorizeUser, userController.list_users)
userRouter.get('/:id', userController.find_user)
userRouter.post('/', authorizeUser, userController.create_user)
userRouter.put('/', authorizeUser, userController.update_user)
userRouter.delete('/all', authorizeUser, userController.delete_users)
userRouter.delete('/:id', authorizeUser, userController.delete_user)

module.exports = userRouter;
