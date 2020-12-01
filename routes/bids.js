const express = require('express');
const bidRouter = express.Router();
const bidController = require('../controllers/bidController')


const authorizeTransporter = require('../middlewares/authorizeTransporter')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeUser = require('../middlewares/authorizeUser')



bidRouter.post('/add', authorizeTransporter, authorizeAdmin, bidController.create)
bidRouter.get('/:id', authorizeUser, authorizeTransporter, authorizeAdmin, bidController.getOne)
bidRouter.get('/', authorizeTransporter, authorizeAdmin, bidController.getAll)
// bidRouter.put('/', authorizeTransporter, authorizeAdmin, bidController.update)
bidRouter.delete('/:id', authorizeTransporter, authorizeAdmin, bidController.delete)
// bidRouter.get('/history', authorizeTransporter, authorizeAdmin, bidController.bidsHistory)

module.exports = bidRouter;