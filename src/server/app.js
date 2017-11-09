require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const sequelize = require('./models').sequelize;

const store = new SequelizeStore({
    db: sequelize
});

app.use(session({
    store: store,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

store.sync();

app.use(passport.initialize());
app.use(passport.session());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../')));

require('./routes')(app)

module.exports = app;
