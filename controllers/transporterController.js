const Transporter = require('../models/Transporter')
const bcrypt = require('bcrypt')

exports.list_transporters = (req, res) => {
  console.log(req.transporterPayload)
    Transporter.find()
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.find_transporter = (req, res) => {
    const { id } = req.params
    Transporter.findById(id).populate('transporters')
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.create_transporter = async (req, res) => {
    const { first_name, last_name, company_name, company_type, email, password } = req.body
 
    try {
      let transporter = await Transporter.findOne({ email })
      if (transporter) return res.status(400).send('A company already exist with this email')
      transporter = new Transporter({ first_name, last_name, company_name, company_type, email, password: await bcrypt.hash(password, 10) })

      await transporter.save()
      res.set('x-authorization-token', token).send({ _id: company._id, email: company.email})
    } catch(e) {
      console.error(e.message)
    }
  }

exports.update_transporter = (req, res) => {
    const { old_name, new_name } = req.body
    Transporter.updateOne({ last_name: old_name }, { last_name: new_name })
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.delete_transporter = (req, res) => {
    const { id } = req.params
    Transporter.deleteOne({ _id: id })
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.delete_transporters = (req, res) => {
    const { condition, value } = req.body
    Tranporter.deleteMany({[condition]: value})
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
}