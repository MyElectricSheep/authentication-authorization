const express = require('express');
const courseRouter = express.Router();

const courseController = require('../controllers/courseController')

courseRouter.post('/', courseController.create_course)

module.exports = courseRouter;