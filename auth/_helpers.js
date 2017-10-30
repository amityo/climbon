const bcrypt = require('bcryptjs');
const User = require('../models').User;

function comparePass(userPassword, databasePassword) {
    //todo: change to compare async
    return bcrypt.compareSync(userPassword, databasePassword);
} //todo: ; at end of function?

function createUser(req) {
    //todo: to async
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);

    return User.create({
        username: req.body.username,
        password: hash
    })
    .then(user => user)
    .catch((err) => { throw err; });
}

function loginRequired(req, res, next) {
    if (!req.user) return handleResponse(res, 401, 'Please log in');
    return next();
}

function adminRequired(req, res, next) {
    if (!req.user) return handleResponse(res, 401, 'Please log in');
    if (!req.user.admin) return handleResponse(res, 401, 'You are not authorized'); 
    return next();
}

function loginRedirect(req, res, next) {
    if(req.user) return handleResponse(res, 400, 'You are already logged in');
    return next();
}

//todo: code duplication. where should i put this?
function handleResponse(res, code, statusMsg) {
    res.status(code).json({ status: statusMsg });
}

module.exports = {
    comparePass,
    createUser,
    loginRequired,
    adminRequired,
    loginRedirect
};