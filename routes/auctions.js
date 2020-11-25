const express = require('express');
const auctionRouter = express.Router();

const auctionController = require('../controllers/auctionController')

auctionRouter.post('/', auctionController.create_auction)

module.exports = auctionRouter;