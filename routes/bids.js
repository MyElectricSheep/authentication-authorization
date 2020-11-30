const express = require('express');
const bidRouter = express.Router();
const bidController = require('../controllers/bidController')


const authorizeTransporter = require('../middlewares/authorizeTransporter')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeUser = require('../middlewares/authorizeUser')



bidRouter.post('/', authorizeTransporter, authorizeAdmin, bidController.createBid)
bidRouter.get('/:id', authorizeUser, authorizeTransporter, authorizeAdmin, bidController.getOne)
bidRouter.get('/', authorizeTransporter, authorizeAdmin, bidController.getAll)
bidRouter.put('/', authorizeTransporter, authorizeAdmin, bidController.updateBid)
bidRouter.delete('/:id', authorizeTransporter, authorizeAdmin, bidController.deleteBid)
bidRouter.delete('/all', authorizeTransporter, authorizeAdmin, bidController.deleteAllBids)
bidRouter.get('/history', authorizeTransporter, authorizeAdmin, bidController.bidsHistory)
bidRouter.post('/getlatest', authorizeTransporter, authorizeAdmin, bidController.latestBids)

module.exports = bidRouter;