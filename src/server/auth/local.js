const passport = require('passport');
const passportJwt = require('passport-jwt');

const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const bcrypt = require('bcryptjs');

const init = require('./passport');
const User = require('../models').User;

init();

function comparePass(userPassword, databasePassword) {
    return bcrypt.compare(userPassword, databasePassword);
}

const localStrategy = new LocalStrategy({}, (username, password, done) => {
    User.findOne({ where: { username: username } })
        .then(user => {
            if (!user) return done(null, false);
            comparePass(password, user.password).then(res => {
                if (!res) { return done(null, false) }
                return done(null, user);
            });
        })
        .catch((err) => done(err));
});


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
    User.findOne({ where: { username: payload.username } })
        .then(user => {
            if (!user) return done(null, false);
            return done(null, user);
        })
        .catch((err) => done(err));
});

passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);

module.exports = passport;