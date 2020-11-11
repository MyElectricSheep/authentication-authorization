const Student = require('../models/Student')
const bcrypt = require('bcrypt')

exports.list_students = (req, res) => {
  console.log(req.studentPayload)
    Student.find()
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.find_student = (req, res) => {
    const { id } = req.params
    Student.findById(id).populate('course')
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.create_student = async (req, res) => {
    const { first_name, last_name, course, email, password } = req.body
    // console.log(first_name, last_name)
  
    // Promise-based syntax
    // Student.create({ first_name, last_name })
    //   .then(data => res.json(data))
    //   .catch(err => console.error(err.message))
  
    // Async-Await Syntax
    try {
      let student = await Student.findOne({ email })
      if (student) return res.status(400).send('This student already exists')
      // student = await Student.create({ first_name, last_name, course, email, password })
      student = new Student({ first_name, last_name, course, email, password: await bcrypt.hash(password, 10) })

      await student.save()
      res.set('x-authorization-token', token).send({ _id: student._id, email: student.email})
    } catch(e) {
      console.error(e.message)
    }
  }

exports.update_student = (req, res) => {
    const { old_name, new_name } = req.body
    Student.updateOne({ last_name: old_name }, { last_name: new_name })
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.delete_student = (req, res) => {
    const { id } = req.params
    Student.deleteOne({ _id: id })
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.delete_students = (req, res) => {
    const { condition, value } = req.body
    Student.deleteMany({[condition]: value})
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
}