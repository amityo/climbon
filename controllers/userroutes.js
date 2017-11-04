const UserRoute = require('../models').UserRoute;
const dbHelpers = require('../db/_helpers');
const Route = require('../models').Route;
const controllerUtils = require('./_helpers');

module.exports = {
    list(req, res) {
        return UserRoute
            .findAll({
                where: { user_id: getUserId(req) },
                include: [Route]
            })
            .then(ur => controllerUtils.success(res, ur))
            .catch(err => controllerUtils.error(res, err))
    },

    create(req, res) {
        return UserRoute
            .create({
                finishType: req.body.finish_type,
                completionDate: req.body.completion_date || dbHelpers.currentDate(),
                numberOfTries: req.body.number_of_tries,
                route_id: req.body.route_id,
                user_id: getUserId(req)
            })
            .then(ur => controllerUtils.success(res, ur))
            .catch(err => controllerUtils.error(res, err))
    }
};

function getUserId(req) {
    return req.params.user == 'me' ? req.user.id : req.params.user
}
