// const Bid = require('../models/Bid') // This would be needed when working with Mongoose

const client = require('./../database/client')

/* GET users listing. */
module.exports.getAll=(req, res, next) => {
    res.send('bids');
};

module.exports.getOne=(req, res) =>{
    const { id } = req.params
    db.query('SELECT * FROM bid WHERE id=$1', [id])
    .then(data => {
        if (data.rows.length) res.status(404).send('Bid not found')
        res.status(200).json(data.rows)
    })
}


module.exports.create=(req, res, next) =>{
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

        query
        // SQL Query > Insert Data
        for (var i = 0; i < data.auction_id.length; ++i) {
            query = client
            .query("INSERT INTO bid(auction_id, transporter_id, time, bid_amount) values($1, $2, $3, $4,)",
                [data.auction_id[i], curr_time, data.bid_amount[i]]);
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
};



module.exports.getAll=(req, res, next)=> {
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
        const query = client
        .query("SELECT * FROM bid ORDER BY bid_id DESC");

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
};


module.exports.delete= (req, res) => {
    const { id } = req.params
    db.query('DELETE FROM bid WHERE id=$1 RETURNING *', [ id ])
        .then(data => res.json(data.rows))
        .catch(err => console.error(err))
}


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


// module.exports = bidController;



// bidrouter.get('/test', function(req, res, next) {
//     const results = [];
//     // Get a Postgres client from the connection pool


//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }

//         // SQL Query > Insert Data
//         const query = client.query("SELECT * FROM bid");
//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });

//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             // console.log(results);
//             return res.json(results);
//         });
//     });
// });

// bidRouter.post('/bidhistory', function(req, res, next) {
//     const results = [];
//     // Get a Postgres client from the connection pool
//     const data = {
//         auction_id: req.body.auction_id,
//         transporter_id: req.body.transporter_id
//     };

//     console.log(data);
//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }

//         // SQL Query > Insert Data
//         const query = 
//         client
//         .query("SELECT bid_id, transporter_id, timelime, bid_amount FROM bid WHERE auction_id=($1) AND category_id=($2)",
//             [data.auction_id, data.transporter_id]);

//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });

//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             //console.log(results);
//             return res.json(results);
//         });
//     });
// });


// bidRouter.post('/add', function(req, res, next) {
//     const results = [];
//     const data = {
//         auction_id: req.body.auction_id
//     };

//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }

//         // SQL Query > Insert Data
//         const query = 
//         client
//         .query("SELECT bid.auction_id, auction.auction_title FROM bid " +
//             "INNER JOIN auction ON bid.auction_id=auctions.auction_id where bid.auction_id=($1) group by auction.auction_id, bid.category_id;", [data.auction_id]);

//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });

//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             // console.log(results);
//             return res.json(results);
//         });
//     });
// });
