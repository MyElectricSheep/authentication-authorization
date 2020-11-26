const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController')
const authorizeAdmin = require('../middlewares/authorizeAdmin')

adminRouter.get('/', authorizeAdmin, adminController.list_admins)
adminRouter.get('/:id', authorizeAdmin, adminController.find_admin)
adminRouter.post('/', authorizeAdmin, adminController.create_admin)
adminRouter.put('/', authorizeAdmin, adminController.update_admin)
adminRouter.delete('/all', authorizeAdmin, adminController.delete_admins)
adminRouter.delete('/:id', authorizeAdmin, adminController.delete_admin)

module.exports = adminRouter;