// Review routes


const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/reviewController')
const authorizeUser = require('../middlewares/authorizeUser')

const authorizeAdmin = require('../middlewares/authorizeAdmin')


reviewRouter.get('/', authorizeUser, authorizeAdmin, reviewController.getAll) // get all reviews
reviewRouter.get('/:id', reviewController.getOne) // get one review
reviewRouter.post('/', authorizeUser, authorizeAdmin, reviewController.createReview) // create a review
// reviewRouter.put('/', authorizeAdmin, reviewController.updateReview) // update a review
// reviewRouter.delete('/all', authorizeAdmin, reviewController.deleteAllReview) // delete all reviews
reviewRouter.delete('/:id', authorizeUser, authorizeAdmin, reviewController.deleteReview) // delete a review

module.exports = reviewRouter;
