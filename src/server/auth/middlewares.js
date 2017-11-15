const passport = require('./local');

module.exports = {
    authenticate(req, res, next) {
         return passport.authenticate('jwt', {session: false}, (err, user, info) => {
            //todo: normal error messages...
            if(!user) return handleResponse(res, 401, 'Please log in');
            req.logIn(user, (err) => {
                if (err) { handleResponse(res, 500, 'error'); }
                return next();
            });
        })(req,res,next);
    },

    loginRequired(req, res, next) {
        if (!req.user) return handleResponse(res, 401, 'Please log in');
        return next();
    },

    adminRequired(req, res, next) {
        if (!req.user) return handleResponse(res, 401, 'Please log in');
        if (!req.user.admin) return handleResponse(res, 401, 'You are not authorized');
        return next();
    },

    loginRedirect(req, res, next) {
        if (req.user) return handleResponse(res, 400, 'You are already logged in');
        return next();
    }
};

//todo: code duplication. where should i put this?
function handleResponse(res, code, statusMsg) {
    res.status(code).json({ status: statusMsg });
}