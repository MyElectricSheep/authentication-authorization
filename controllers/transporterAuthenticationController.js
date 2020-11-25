const Transporter = require('../models/Transporter')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    const { email, password } = req.body
    let transporter = await transporter.findOne({ email })
    if (!transporter) return res.status(400).send('Invalid Credentials') // bad request
    const match = await bcrypt.compare(password, transporter.password)
    if (!match) return res.status(400).send('Invalid Credentials') // bad request
    const token = transporter.createToken()
    res.set('x-authorization-token', token).send("Login successful!")