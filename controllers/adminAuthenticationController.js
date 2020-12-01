const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    const { email, password } = req.body
    let admin = await admin.findOne({ email })
    if (!admin) return res.status(400).send('Invalid Credentials') // bad request
    const match = await bcrypt.compare(password, admin.password)
    if (!match) return res.status(400).send('Invalid Credentials') // bad request
    const token = admin.createToken()
    res.set('x-authorization-token', token).send("Login successful!")
}