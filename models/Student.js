const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    first_name: {type: String, min: 2, max: 50, required: true},
    last_name: {type: String, min: 2, max: 50, required: true},
    last_updated: {type: Date, default: Date.now}
})

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