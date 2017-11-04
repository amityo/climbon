const express = require('express');

// see: https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
const router = express.Router({ mergeParams: true });
const userRoutesController = require('../controllers').userRoutes;
const mid = require('../auth/middlewares');

/**
 * GET user routes listing.
 */
router.get('/', userRoutesController.list);

router.post('/', adminRequiredIfNotMe, userRoutesController.create);

module.exports = router;

function adminRequiredIfNotMe(req, res, next) {
    if (req.params.user == 'me') {
        return next();
    }
    return mid.adminRequired(req, res, next)
}