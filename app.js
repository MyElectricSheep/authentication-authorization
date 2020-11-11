require('dotenv').config()
require('./database/client')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const studentRouter = require('./routes/students');
const courseRouter = require('./routes/courses')
const authenticationRouter = require('./routes/authentication')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/student', studentRouter);
app.use('/course', courseRouter);
app.use('/auth', authenticationRouter)

module.exports = app;
