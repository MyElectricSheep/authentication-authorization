const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    course_name: String,
    batch: String,
    organization: String
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course