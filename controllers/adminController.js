const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')

exports.list_admin = (req, res) => {
  console.log(req.userPayload)
    Admin.find()
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.find_admin = (req, res) => {
    const { id } = req.params
    Admin.findById(id).populate('profiles')
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.create_admin = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
 
    try {
      let admin = await admin.findOne({ email })
      if (admin) return res.status(400).send('One admin already exist with this email')
      admin = new Admin({ first_name, last_name, email, password: await bcrypt.hash(password, 10) })

      await admin.save()
      res.set('x-authorization-token', token).send({ _id: admin._id, email: admin.email})
    } catch(e) {
      console.error(e.message)
    }
  }

exports.update_admin = (req, res) => {
    const { old_name, new_name } = req.body
    Admin.updateOne({ last_name: old_name }, { last_name: new_name })
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.delete_admin = (req, res) => {
    const { id } = req.params
    Admin.deleteOne({ _id: id })
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.delete_admin = (req, res) => {
    const { condition, value } = req.body
    Admin.deleteMany({[condition]: value})
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
}