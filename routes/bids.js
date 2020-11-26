const express = require('express');
const bidRouter = express.Router();
const bidController = require('../controllers/bidController')

const authorizeTransporter = require('../middlewares/authorizeTransporter')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeUser = require('../middlewares/authorizeUser')



bidRouter.post('/', authorizeTransporter, authorizeAdmin, bidController.create_bid)
bidRouter.get('/:id', authorizeUser, authorizeTransporter, authorizeAdmin, bidController.find_bid)
bidRouter.get('/', authorizeTransporter, authorizeAdmin, bidController.list_bids)
bidRouter.put('/', authorizeTransporter, authorizeAdmin, bidController.update_bid)
bidRouter.delete('/:id', authorizeTransporter, authorizeAdmin, bidController.delete_bid)
bidRouter.delete('/all', authorizeTransporter, authorizeAdmin, bidController.delete_bids)

module.exports = bidRouter;