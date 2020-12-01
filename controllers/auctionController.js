// const Auction = require('../models/Auction'); // use for Mongoose

const client = require('./../database/client');


/* GET users listing. */
module.exports.getAll=(req, res, next) => {
    res.send('auctions');
},


module.exports.getAll=(req, res, next) =>{
    const results = [];

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
        const query = client.query("SELECT * FROM auction");

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

module.exports.getOne= (req, res) =>{
  const { id } = req.params;
  client
  db.query('SELECT * FROM auctions WHERE id=$1', [id])
  .then((data)=> {
    if (!data.rows.length) res.status(404).send('There is no auction with that ID')
    res.status(200).json(data.rows)
  })
  .catch((err)=> console.error(err.message))
},



module.exports.getAll=(req, res, next) =>{
    const results = [];

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Select Data // edit for current auctions
        const query = client.query("SELECT * FROM auction");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
};


module.exports.createAuction=(req, res, next) =>{
    const results = [];
    // Get a Postgres client from the connection pool

    const data = {
        auction_id: req.body.auction_id,
        description: req.body.auction_description,
        title: req.body.auction_title,
        timeline: req.body.timeline,
        budget: req.body.auction_budget,
        s_time: req.body.start_time,
        e_time: req.body.end_time,
        cr_user: req.body.user_name,
        category: req.body.auction_category,
        move_from: req.body.move_from,
        move_to : req.body.move_to,
    };

    console.log(data);
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        const date = new Date();
        const curr_date = date.getFullYear() +'-'+ date.getMonth() +'-'+ date.getDate();
        // SQL Query > Insert Data
        const query = client.query("INSERT INTO auction(auction_id, description, auction_title, auction_budget, timeline, start_time, end_time, auction_category) " +
            "values($1, $2, $3, $4, $5, $6, $7, $8)",
            [data.auction_id, data.auction.description, data.auction_title, data.auction_budget, data.auction_timeline, data.auction_start_time, curr_date, data.auction_category]);

        data.transporter.forEach(function (transporter) {
            client.query("INSERT INTO auction_transporters (auction_id, user_id) values ($1, $2)", [data.auction_id, transporter]);
        });

        data.category.forEach(function (category) {
            client.query("INSERT INTO auction_category (auction_id, auction_title, auction_volume) values ($1, $2, $3)", [data.auction_id, category]);
        });

        data.auction_val.forEach(function (auc_val) {
            client.query("INSERT INTO bid (auction_id, transporter_id, time, bid_amount) VALUES ($1, $2, $3, $4)",
                [data.auction_id, auc_val.auction_id, data.user_id, getTime(), auc_val.value]);
        });


        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            // console.log(results);
            return res.json({"msg": 'Auction added successfully'});
        });
    });
};

module.exports.createAuction=(req, res, next) =>{

    const auction_data = [];
    const categorys = [];
    const  transporters = [];

    // Get a Postgres client from the connection pool
    const data = {
        auction_id: req.body.auction_id
    };
    console.log(data);
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Select Data
        const query1 = client
        .query("SELECT * FROM auction WHERE auction_id=($1)", [data.auction_id]);
        query1.on('row', function(row) {
            auction_data.push(row);
        });

        const query2 = client
        .query("SELECT user_id, last_name, first_name FROM user WHERE user_id in (SELECT user_id FROM auction_transporter WHERE auction_id=($1))", [data.auction_id]);
        query2.on('row', function(row) {
            transporters.push(row);
        });

        var query3 = client
        .query("SELECT auction_id, auction_title FROM category WHERE auction_id in (SELECT auction_id from auction_category WHERE auction_id=($1))", [data.auction_id]);
        query3.on('row', function(row) {
            categorys.push(row);
        });

        // After all data is returned, close connection and return results
        query3.on('end', function() {
            done();
            auction_data.push(transporters);
            auction_data.push(auctions);
            return res.json(auction_data);
        });
    });
};


module.exports.deleteAuction=(req, res, next) =>{
    const results = [];
    // Get a Postgres client from the connection pool
    const data = { uid: req.body.auction_id};

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Delete Data

        const query1 = client.query("DELETE FROM auction_category WHERE auction_id=($1)",[data.uid]);
        const query2 = client.query("DELETE FROM auction_transporters WHERE auction_id=($1)",[data.uid]);
        const query3 = client.query("DELETE FROM bid WHERE auction_id=($1)",[data.uid]);
        const query = client.query("DELETE FROM auction WHERE auction_id=($1)", [data.uid]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            // console.log(results);
            // return res.json(results[0].password);
            return res.json({"msg": 'Auction successfully deleted'});
        });
    });
};

module.exports.getAll=(req, res, next) => {
    const results = [];
    // Get a Postgres client from the connection pool
    const data = {
        auc_id: req.body.auction_id,
        title: req.body.auction_title,
        due_date: req.body.due_date,
        category: req.body.auction_category,
    };

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
        const query = client.query("SELECT * FROM auction");
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


module.exports.deleteAuction=(req, res) => {
  const { id } = req.params;
  client
  .query("DELETE FROM auction WHERE id=$1 RETURNING *", [id])
  .then((data)=> res.json(data.rows))
  .catch((err)=> console.error(err));
}


module.exports.getAll=(req, res, next) => {
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
        const query = client.query("SELECT auction_id, auction_title, auction_category, due_date FROM AUCTION");
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


///-------------------------TEST ---------/////
/* GET users listing. */
// auctionRouter.get('/', function(req, res, next) {
//     res.send('auctions');
// });


// auctionRrouter.get('/', function(req, res, next) {
//     const results = [];

//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }
//         // SQL Query > Select Data
//         const query = client.query("SELECT * FROM auctions");
//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });
//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             return res.json(results);
//         });
//     });
// });

// auctionRouter.post('/api/add', function(req, res, next) {
//     const results = [];
//     // Get a Postgres client from the connection pool
//     const data = {
//         auction_id: req.body.auction_id,
//         aution_title: req.body.auction_title,
//         description: req.body.auction_description,
//         category: req.body.auction_category,
//         volume: req.body.auction_volume,

//     };

//     console.log(data);
//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }
//         console.log(data.description);
//         // SQL Query > Select Data
//         const query = client.query("INSERT INTO autions(auction_id, auction_title, auction_description, auction_volume, auction_category ) values($1, $2, $3, $4, $5)",
//             [data.auction_id, data.aution_title, data.auction_description, data.auction_volume, data.auction_category ]);

//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });
//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             // console.log(results);
//             return res.json({"msg": 'Auction has been successfully added'});
//         });
//     });
// });

// auctionRouter.post('/api/edit', function(req, res, next) {
//     const results = [];
//     // Get a Postgres client from the connection pool
//     const data = {
//       auction_id: req.body.auction_id,
//       aution_title: req.body.auction_title,
//       description: req.body.auction_description,
//       category: req.body.auction_category,
//       volume: req.body.auction_volume,
//     };

//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }
//         // SQL Query > Select Data
//         const query = client.query("SELECT * FROM auctions WHERE auction_id=($1)", [data.auction_id]);
//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });
//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             return res.json(results);
//         });
//     });
// });

// auctionRouter.post('/api/auction', function(req, res, next) {
//     const results = [];
//     const id = req.body.auction_id;
//     // Get a Postgres client from the connection pool
//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }
//         // SQL Query > Select Data
//         const query = client.query("SELECT auction_id, auction_title FROM auctions WHERE auction_id in " +
//             "(SELECT auction_id from auction_category WHERE auction_id=($1))",[id]);
//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });
//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             return res.json(results);
//         });
//     });
// });

// auctionRouter.post('/edit/confirm', function(req, res, next) {
//     const results = [];
//     // Get a Postgres client from the connection pool
//     const data = {
//       auction_id: req.body.auction_id,
//       aution_title: req.body.auction_title,
//       description: req.body.auction_description,
//       category: req.body.auction_category,
//       volume: req.body.auction_volume,
//     };

//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }
//         // SQL Query > Select Data
//         const query = client.query("UPDATE auctions SET title=($1), description=($2) WHERE item_id=($3)",
//             [data.title, data.description, data.auction_id]);
//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });
//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             // console.log(results);
//             return res.json({"msg": 'Auction has been successfully edited'});
//         });
//     });
// });

// auctionRouter.delete('/del', function(req, res, next) {
//     const results = [];
//     // Get a Postgres client from the connection pool
//     const data = { aution_id: req.body.auction_id };

//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }
//         // SQL Query > Select Data
//         const query = client.query("DELETE FROM auctions WHERE auction_id=($1)", [data.auction_id]);
//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });
//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             // console.log(results);
//             return res.json({"msg": 'Auction successfully deleted'});
//         });
//     });
// });

// auctionRouter.get('/search', function(req, res, next) {
//     const results = [];
//     // Get a Postgres client from the connection pool
//     const data = {
//         auction_id: req.body.user_id,
//         aution_title: req.body.auction_title,
//         date_created: req.body.date_created,
//         auction_category: req.body.auction_category,
//         auction_volume: req.body.auction_volume,
        
//     };

//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }
//         // SQL Query > Select Data
//         const query = client.query("SELECT * FROM users WHERE user_id=($1)", [data.uid]);
//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });
//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             // console.log(results);
//             return res.send(results);
//         });
//     });
// });

// auctionRouter.get('/auctionlist', function(req, res, next) {
//     const results = [];
//     // Get a Postgres client from the connection pool

//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }
//         // SQL Query > Select Data
//         const query = client.query("SELECT auction_id, aution_title FROM auctions");
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






// Mongoose method to query db


// exports.create_auction = (req, res) => {
//     const { auction_id, user_id, auction_title, auction_description, auction_category, auction_budget, auction_volume, auction_timeline, auction_move_from_address, auction_move_to_address, auction_move_from_postcode, auction_move_to_postcode, auction_move_from_city, auction_move_to_city, auction_move_from_country, auction_move_to_country, move_date_on, deliver_date_on } = req.body
//     Auction.create({ auction_id, user_id, auction_title, auction_description, auction_category, auction_budget, auction_volume, auction_timeline, auction_move_from_address, auction_move_to_address, auction_move_from_postcode, auction_move_to_postcode, auction_move_from_city, auction_move_to_city, auction_move_from_country, auction_move_to_country, move_date_on, deliver_date_on })
//         .then(data => res.json(data))
//         .catch(err => console.error(err))
// }

// exports.list_auctions = (req, res) => {
//     console.log(req.userPayload)
//       Auction.find()
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
//     }
  
//   exports.find_auction = (req, res) => {
//       const { id } = req.params
//       Auction.findById(id).populate('auctions')
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
//     }
  
//   exports.update_auction = (req, res) => {
//       const { old_description, new_description } = req.body
//       Auction.updateOne({ auction_description : old_description }, { auction_description : new_description })
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
//     }
  
//   exports.delete_auction = (req, res) => {
//       const { id } = req.params
//       Auction.deleteOne({ _id: id })
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
//     }
  
//   exports.delete_auction = (req, res) => {
//       const { condition, value } = req.body
//       Auction.deleteMany({[condition]: value})
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
//   }