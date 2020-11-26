const Bid = require('../models/Bid')

exports.create_bid = (req, res) => {
    const { bid_id, bid_amount } = req.body
    Bid.create({ bid_id, bid_amount })
        .then(data => res.json(data))
        .catch(err => console.error(err))
}

exports.list_bids = (req, res) => {
    console.log(req.userPayload)
      Bid.find()
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
    }
  
  exports.find_bid = (req, res) => {
      const { id } = req.params
      Bid.findById(id).populate('bids')
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
    }
  
  exports.update_bid = (req, res) => {
      const { old_bid_amount, new_bid_amount } = req.body
      Bid.updateOne({ bid_amount : old_bid_amount }, { bid_amount : new_bid_amount })
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
    }
  
  exports.delete_bid = (req, res) => {
      const { id } = req.params
      Bid.deleteOne({ _id: id })
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
    }
  
  exports.delete_bid = (req, res) => {
      const { condition, value } = req.body
      Bid.deleteMany({[condition]: value})
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
  }