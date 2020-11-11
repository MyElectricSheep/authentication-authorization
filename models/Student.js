const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    first_name: {type: String, min: 2, max: 50, required: true},
    last_name: {type: String, min: 2, max: 50, required: true},
    last_updated: {type: Date, default: Date.now},
    email: {type: String, min: 2, max: 50, required: true},
    password: {type: String, required: true},
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
})

studentSchema.methods.createToken = function() {
    const payload = { _id: this._id, email: this.email }
    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h"})
    return token
}

const Student = mongoose.model('Student', studentSchema)

module.exports = Student

// Mongoose Data Types:
// https://mongoosejs.com/docs/schematypes.html
// String
// Number
// Date
// Buffer
// Boolean
// ObjectId
// Array
// ...