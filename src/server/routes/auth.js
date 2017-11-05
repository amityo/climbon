const express = require('express');
const router = express.Router();

const mid = require('../auth/middlewares');
const passport = require('../auth/local');
const usersController = require('../controllers').users;

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
                //todo: is anon method the best soultion or create another func outside
                if (err) { handleResponse(res, 500, 'error'); }
                handleResponse(res, 200, 'success');
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