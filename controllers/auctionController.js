const Auction = require('../models/Auction')

exports.create_auction = (req, res) => {
    const { auction_id, user_id, auction_title, auction_description, auction_category, auction_budget, auction_volume, auction_timeline, auction_move_from_address, auction_move_to_address, auction_move_from_postcode, auction_move_to_postcode, auction_move_from_city, auction_move_to_city, auction_move_from_country, auction_move_to_country, move_date_on, deliver_date_on } = req.body
    Auction.create({ auction_id, user_id, auction_title, auction_description, auction_category, auction_budget, auction_volume, auction_timeline, auction_move_from_address, auction_move_to_address, auction_move_from_postcode, auction_move_to_postcode, auction_move_from_city, auction_move_to_city, auction_move_from_country, auction_move_to_country, move_date_on, deliver_date_on })
        .then(data => res.json(data))
        .catch(err => console.error(err))
}

exports.list_auctions = (req, res) => {
    console.log(req.userPayload)
      Auction.find()
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
    }
  
  exports.find_auction = (req, res) => {
      const { id } = req.params
      Auction.findById(id).populate('auctions')
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
    }
  
  exports.update_auction = (req, res) => {
      const { old_description, new_description } = req.body
      Auction.updateOne({ auction_description : old_description }, { auction_description : new_description })
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
    }
  
  exports.delete_auction = (req, res) => {
      const { id } = req.params
      Auction.deleteOne({ _id: id })
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
    }
  
  exports.delete_auction = (req, res) => {
      const { condition, value } = req.body
      Auction.deleteMany({[condition]: value})
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
  }