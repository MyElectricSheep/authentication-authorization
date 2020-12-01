const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController')
const authorizeAdmin = require('../middlewares/authorizeAdmin')

adminRouter.get('/', authorizeAdmin, adminController.getAll)
adminRouter.get('/:id', authorizeAdmin, adminController.getOne)
adminRouter.post('/', authorizeAdmin, adminController.createAdmin)
adminRouter.put('/', authorizeAdmin, adminController.updateAdmin)
// adminRouter.delete('/all', authorizeAdmin, adminController.deleteAllAdmins)
adminRouter.delete('/:id', authorizeAdmin, adminController.deleteAdmin)

module.exports = adminRouter;