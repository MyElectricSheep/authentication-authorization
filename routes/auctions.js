const express = require('express');
const auctionRouter = express.Router();
const authorizeUser = require('../middlewares/authorizeUser')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeTransporter = require('../middlewares/authorizeTransporter')

const auctionController = require('../controllers/auctionController')

auctionRouter.get('/:id', authorizeUser, authorizeTransporter, authorizeAdmin, auctionController.getOne) // get a single auction
auctionRouter.get('/', authorizeUser,authorizeTransporter, authorizeAdmin, auctionController.getAll)
auctionRouter.post('/', authorizeUser, authorizeTransporter, authorizeAdmin, auctionController.createAuction)
auctionRouter.put('/', authorizeAdmin, auctionController.updateAuction)
auctionRouter.delete('/:id', authorizeAdmin, auctionController.deleteAuction)

module.exports = auctionRouter;