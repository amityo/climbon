const bcrypt = require('bcryptjs');

const User = require('../models').User;

module.exports = {
    create(req) {
        return bcrypt.genSalt(10)
            .then(salt => {
                return bcrypt.hash(req.body.password, salt);
            }).then(hash => {
                return User.create({
                    username: req.body.username,
                    password: hash
                });
            });
    }
};
