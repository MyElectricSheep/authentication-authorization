const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bidSchema = new Schema({
    "bid_id":"Schema.Types.ObjectId",
    "bid_amount": "Number",
    "bid_date": "Date",
})