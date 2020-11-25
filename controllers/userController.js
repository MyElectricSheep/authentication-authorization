const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.list_users = (req, res) => {
  console.log(req.userPayload)
    User.find()
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.find_user = (req, res) => {
    const { id } = req.params
    User.findById(id).populate('profiles')
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.create_user = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
 
    try {
      let user = await User.findOne({ email })
      if (user) return res.status(400).send('A user already exist with this email')
      user = new User({ first_name, last_name, email, password: await bcrypt.hash(password, 10) })

      await user.save()
      res.set('x-authorization-token', token).send({ _id: user._id, email: user.email})
    } catch(e) {
      console.error(e.message)
    }
  }

exports.update_user = (req, res) => {
    const { old_name, new_name } = req.body
    User.updateOne({ last_name: old_name }, { last_name: new_name })
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.delete_user = (req, res) => {
    const { id } = req.params
    User.deleteOne({ _id: id })
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.delete_users = (req, res) => {
    const { condition, value } = req.body
    User.deleteMany({[condition]: value})
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
}