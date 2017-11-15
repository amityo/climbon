require('dotenv').config();

const express = require('express');
const passport = require('passport');
const cors = require('cors');

const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(passport.initialize());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../')));

app.use(cors({
    origin: true,
    credentials: true
}));

require('./routes')(app)

module.exports = app;
