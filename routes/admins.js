const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController')
const authorizeAdmin = require('../middlewares/authorizeAdmin')

adminRouter.get('/', authorizeAdmin, adminController.list_admins)
adminRouter.get('/:id', adminController.find_admin)
adminRouter.post('/', adminController.create_admin)
adminRouter.put('/', adminController.update_admin)
adminRouter.delete('/all', authorizeAdmin, adminController.delete_admins)
adminRouter.delete('/:id', authorizeAdmin, adminController.delete_admin)

module.exports = adminRouter;