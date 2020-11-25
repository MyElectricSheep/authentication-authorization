require('dotenv').config()
require('./database/client')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const userRouter = require('./routes/users');
const auctionRouter = require('./routes/auctions')
const adminRouter = require('./routes/admins')
const transporterRouter = require('./routes/transporters')
const authenticationRouter = require('./routes/authentication')

// const userAuthenticationRouter = require('./routes/userAuthentication')
// const adminAuthenticationRouter = require('./routes/adminAuthentication')
// const transporterAuthenticationRouter = require('./routes/transporterAuthentication')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/transporter', transporterRouter);
app.use('/auction', auctionRouter);
app.use('/auth', authenticationRouter)

module.exports = app;