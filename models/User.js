const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema({

    first_name: {
        type: String, 
        min: 2, 
        max: 50, 
        required: true
    },
    last_name: {
        type: String, 
        min: 2, 
        max: 50, 
        required: true
    },
    last_updated: {
        type: Date, 
        default: Date.now
    },
    email: {
        type: String, 
        min: 2, 
        max: 50, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String, 
        default: 'basic', 
        // enum: [“basic", "transporter", "admin"]
    },
})

userSchema.methods.createToken = function() {
    const payload = { _id: this._id, email: this.email }
    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h"})
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User