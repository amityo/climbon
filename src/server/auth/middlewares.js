module.exports = {
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