const express = require('express');
const router = express.Router();

const mid = require('../auth/middlewares');
const passport = require('../auth/local');
const usersController = require('../controllers').users;
const jwt = require('jsonwebtoken');

router.post('/register', mid.loginRedirect, (req, res, next) => {
    return usersController.create(req, res)
        .then(() => {
            passport.authenticate('local', (err, user, info) => {
                if (user) { handleResponse(res, 200, 'success'); }
            })(req, res, next);
        })
        .catch((err) => {
            handleResponse(res, 500, 'error')
        });
});

router.post('/login', mid.loginRedirect, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) handleResponse(res, 500, 'error');
        if (!user) handleResponse(res, 404, 'not found')
        if (user) {
            req.logIn(user, (err) => {
                if (err) { handleResponse(res, 500, 'error'); }
                res.json({ token: jwt.sign({ username: user.username}, process.env.JWT_SECRET) });
            });
        }
    })(req, res, next);
});

router.get('/logout', mid.loginRequired, (req, res, next) => {
    req.logout()
    handleResponse(res, 200, 'success');
});

function handleResponse(res, code, statusMsg) {
    res.status(code).json({ status: statusMsg });
}

module.exports = router;