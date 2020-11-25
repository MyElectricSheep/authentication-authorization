const Bid = require('../models/Bid')

exports.create_bid = (req, res) => {
    const { bid_id, bid_amount } = req.body
    Bid.create({ bid_id, bid_amount })
        .then(data => res.json(data))
        .catch(err => console.error(err))
}