const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authHelpers = require('./_helpers');

const init = require('./passport');
const User = require('../models').User;

options = {};

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
    User.findOne({ where: {username: username}})
        .then(user => {
            if (!user) return done(null, false);
            if(!authHelpers.comparePass(password, user.password)) return done(null, false);
            return done(null, user);
        })
        .catch((err) => done(err));
}));

module.exports = passport;