const express = require('express');
const studentRouter = express.Router();
const studentController = require('../controllers/studentController')
const authorizeStudent = require('../middlewares/authorizeStudent')

studentRouter.get('/', authorizeStudent, studentController.list_students)
studentRouter.get('/:id', studentController.find_student)
studentRouter.post('/', studentController.create_student)
studentRouter.put('/', studentController.update_student)
studentRouter.delete('/all', authorizeStudent, studentController.delete_students)
studentRouter.delete('/:id', authorizeStudent, studentController.delete_student)

module.exports = studentRouter;
