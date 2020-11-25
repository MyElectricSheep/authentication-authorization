const express = require('express');
const auctionRouter = express.Router();
const authorizeUser = require('../middlewares/authorizeUser')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeTransporter = require('../middlewares/authorizeTransporter')

const auctionController = require('../controllers/auctionController')

auctionRouter.post('/', authorizeUser, authorizeTransporter, authorizeAdmin, auctionController.create_auction)
auctionRouter.get('/:id', authorizeUser, authorizeTransporter, authorizeAdmin, auctionController.find_auction)
auctionRouter.get('/', authorizeUser,authorizeTransporter, authorizeAdmin, auctionController.list_auctions)
auctionRouter.put('/', authorizeAdmin, auctionController.update_auction)
auctionRouter.delete('/:id', authorizeUser, authorizeTransporter, authorizeAdmin, auctionController.delete_auction)

module.exports = auctionRouter;