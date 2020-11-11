const Student = require('../models/Student')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    const { email, password } = req.body
    let student = await Student.findOne({ email })
    if (!student) return res.status(400).send('Invalid Credentials') // bad request
    const match = await bcrypt.compare(password, student.password)
    if (!match) return res.status(400).send('Invalid Credentials') // bad request
    const token = student.createToken()
    res.set('x-authorization-token', token).send("Login successful!")
}