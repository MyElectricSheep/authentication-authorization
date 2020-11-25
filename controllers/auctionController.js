const Auction = require('../models/Auction')

exports.create_auction = (req, res) => {
    const { auction_id, user_id, auction_title, auction_description, auction_category, auction_budget, auction_volume, auction_timeline, auction_move_from_address, auction_move_to_address, auction_move_from_postcode, auction_move_to_postcode, auction_move_from_city, auction_move_to_city, auction_move_from_country, auction_move_to_country, move_date_on, deliver_date_on } = req.body
    Auction.create({ auction_id, user_id, auction_title, auction_description, auction_category, auction_budget, auction_volume, auction_timeline, auction_move_from_address, auction_move_to_address, auction_move_from_postcode, auction_move_to_postcode, auction_move_from_city, auction_move_to_city, auction_move_from_country, auction_move_to_country, move_date_on, deliver_date_on })
        .then(data => res.json(data))
        .catch(err => console.error(err))
}