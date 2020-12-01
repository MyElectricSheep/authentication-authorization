// This could have been used with Mongoose

// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const Schema = mongoose.Schema

// const transporterSchema = new Schema({
//     first_name: {type: String, min: 2, max: 50, required: true},
//     last_name: {type: String, min: 2, max: 50, required: true},
//     company_name: {type: String, min: 2, max: 50, required: true},
//     company_type: {type: String, min: 2, max: 50, required: true},
//     last_updated: {type: Date, default: Date.now},
//     registered_date: {type: Date, default: Date.now},
//     email: {type: String, min: 2, max: 50, required: true},
//     password: {type: String, required: true},
//     website: {type: String, required: false},
//     telephone: {type: String, required: true},
//     role: {
//         type: String, 
//         default: 'transporter', 
//         //enum: [“basic", "transporter", "admin"]
//     },
// })

// transporterSchema.methods.createToken = function() {
//     const payload = { _id: this._id, email: this.email }
//     const secretKey = process.env.JWT_SECRET
//     const token = jwt.sign(payload, secretKey, { expiresIn: "1h"})
//     return token
// }

// const Transporter = mongoose.model('Transporter', transporterSchema);

// module.exports = Transporter;