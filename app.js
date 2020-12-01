// Server enrty points

require('dotenv').config();
require('./database/client');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

// Routes import
 const seedRouter = require('./routes/seeds')
 const userRouter = require('./routes/users');
 const auctionRouter = require('./routes/auctions');
 const bidRouter = require('./routes/bids');
 const reviewRouter = require('./routes/reviews');
 
// const contractRouter = require('./routes/contract');
 const login = require('./routes/login');
 const adminRouter = require('./routes/admins');
 const transporterRouter = require('./routes/transporters');
 const authenticationRouter = require('./routes/authentication');


const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'routes')));
app.use(cors());
app.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "X-requested-With");
    res.header("Access-Control-Allow-Headers", 'Content-Type');
    next();
});


app.use('/', login);
app.use('/reviews', reviewRouter);
// app.use('/contract', contractRouter);
app.use('/seed', seedRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/transporter', transporterRouter);
app.use('/auction', auctionRouter);
app.use('/bids', bidRouter);
app.use('/auth', authenticationRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Transporex!')
})

module.exports = app;