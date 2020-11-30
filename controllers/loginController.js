const express = require('express');
const pg = require('pg');
const router = express.Router();


router.get('/', function(req, res) {
    res.sendFile(__dirname + '/form/login');
});

router.post('/logpost', function(req, res, next) {
    const results = [];
    // Get a Postgres client from the connection pool
    const data = {first_name: req.body.first_name, last_name: req.body.last_name, password: req.body.password};
    console.log(data);

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Select Data
        const query = client.query("SELECT password, role FROM users WHERE user_id=($1)", [id]);
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            console.log(results);
            // return res.json(results[0].password);
            if (results.length == 0) {
                return res.redirect('http://localhost:3000');
            }

            if (data.password == results[0].password) {
                if (results[0].role.toUpperCase() == 'ADMIN') {
                    res.sendFile(__dirname + '/admin_pages/index');
                } else if (results[0].role.toUpperCase() == 'TRANSPORTER') {
                    res.sendFile(__dirname + '/transporter_pages/index');
                } else if (results[0].role.toUpperCase() == 'USER') {
                    res.sendFile(__dirname + '/user_pages/index');
                }
                req.x-authorization-token.userID = req.body.userID;
            } else {

                return res.redirect('/page/404');
            }
        });
    });
});
