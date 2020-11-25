const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    const { email, password } = req.body
    let user = await user.findOne({ email })
    if (!user) return res.status(400).send('Invalid Credentials') // bad request
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).send('Invalid Credentials') // bad request
    const token = user.createToken()
    res.set('x-authorization-token', token).send("Login successful!")
}