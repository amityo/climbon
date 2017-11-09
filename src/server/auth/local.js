const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const init = require('./passport');
const User = require('../models').User;

const options = {};

init();

function comparePass(userPassword, databasePassword) {
    return bcrypt.compare(userPassword, databasePassword);
}

passport.use(new LocalStrategy(options, (username, password, done) => {
    User.findOne({ where: {username: username}})
        .then(user => {
            if (!user) return done(null, false);
            comparePass(password, user.password).then(res => {
              if (!res) { return done(null, false) } 
              return done(null, user);
            }); 
        })
        .catch((err) => done(err));
}));

module.exports = passport;