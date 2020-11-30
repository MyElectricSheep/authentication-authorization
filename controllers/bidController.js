const Bid = require('../models/Bid')
const client = require('./database/client')

/* GET users listing. */
bidRouter.get('/', function(req, res, next) {
    res.send('bids');
});

bidRouter.post('/add', function(req, res, next) {
    const results = [];
    // Get a Postgres client from the connection pool
    const data = {
        auction_id: req.body.auction_id
    };

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Insert Data
        const query = client.query("SELECT bid.auction_id, auctions.auction_title, MIN(bid.bid_amount) FROM bid " +
            "INNER JOIN auctions ON bid.auctions_id=auctions.auction_id where bid.auction_id=($1) group by auctions.auction_id, bid.item_id;", [data.auction_id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            // console.log(results);
            return res.json(results);
        });
    });
});

bidRouter.post('/getlatest', function(req, res, next) {
    const results = [];
    // Get a Postgres client from the connection pool
    const data = {
        auction_id: req.body.auction_id
    };

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Insert Data
        const query = client.query("SELECT DISTINCT ON (m.auction_id) m.auction_id, m.transporter_id, t.min " +
            "FROM (" +
                "SELECT auction_id, MIN(bid_amount) AS  min " +
                "FROM bid WHERE auction_id=($1) " +
                "GROUP BY category_id " +
                ") t JOIN bid m ON m.auction_id=t.auction_id AND t.min=m.bid_amount", [data.auction_id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            console.log(results);
            return res.json(results);
        });
    });
});

bidRouter.post('/bidhistory', function(req, res, next) {
    const results = [];
    // Get a Postgres client from the connection pool
    const data = {
        auction_id: req.body.auction_id,
        transporter_id: req.body.transporter_id
    };

    console.log(data);
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Insert Data
        const query = client.query("SELECT bid_id,transporter_id,timelime,bid_amount FROM bid WHERE auction_id=($1) AND item_id=($2)",
            [data.auction_id,data.transporter_id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            //console.log(results);
            return res.json(results);
        });
    });
});


bidrouter.get('/test', function(req, res, next) {
    const results = [];
    // Get a Postgres client from the connection pool


    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Insert Data
        const query = client.query("SELECT * FROM bid");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            // console.log(results);
            return res.json(results);
        });
    });
});

bidrouter.post('/add/confirm', function(req, res, next) {
    const results = [];
    // Get a Postgres client from the connection pool
    const data = {
        auction_id: req.body.auction_id,
        user_id: req.body.user_id,
        transporter_id: req.body.transporter_id,
        bid_amount: req.body.bid_amount
    };

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        const curr_time = getTime();

        const query;
        // SQL Query > Insert Data
        for (var i = 0; i < data.auction_id.length; ++i) {
            query = client
            .query("INSERT INTO bid(auction_id, transporter_id, time, bid_amount) values($1, $2, $3, $4,)",
                [data.auction_id[i],curr_time, data.bid_amnt[i]]);
        }
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            // console.log(results);
            return res.json({"msg": 'Bid added successfully'});
        });
    });
});

bidRouter.get('/history', function(req, res, next) {
    const results = [];
    // Get a Postgres client from the connection pool

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Insert Data
        const query = client.query("SELECT * FROM bids ORDER BY bid_id DESC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            // console.log(results);
            return res.json(results);
        });
    });
});

function getTime() {
    const date = new Date();

    const hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    const min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    const sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return  hour + ":" + min + ":" + sec;
}



// Mongoose method of data query for bids


// exports.create_bid = (req, res) => {
//     const { bid_id, bid_amount } = req.body
//     Bid.create({ bid_id, bid_amount })
//         .then(data => res.json(data))
//         .catch(err => console.error(err))
// }

// exports.list_bids = (req, res) => {
//     console.log(req.userPayload)
//       Bid.find()
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
//     }
  
//   exports.find_bid = (req, res) => {
//       const { id } = req.params
//       Bid.findById(id).populate('bids')
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
//     }
  
//   exports.update_bid = (req, res) => {
//       const { old_bid_amount, new_bid_amount } = req.body
//       Bid.updateOne({ bid_amount : old_bid_amount }, { bid_amount : new_bid_amount })
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
//     }
  
//   exports.delete_bid = (req, res) => {
//       const { id } = req.params
//       Bid.deleteOne({ _id: id })
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
//     }
  
//   exports.delete_bids = (req, res) => {
//       const { condition, value } = req.body
//       Bid.deleteMany({[condition]: value})
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
//   }