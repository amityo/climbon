const Route = require('../models').Route;
const dbHelpers = require('../db/_helpers');
const controllerUtils = require('./_helpers');

module.exports = {
    create(req, res) {
        return Route.create({
            type: req.body.type,
            grade: req.body.grade,
            color: req.body.color,
            setupDate: req.body.setup_date,
            setters: req.body.setters,
            //todo: find how to make it locationId...
            location_id: req.body.location_id
        })
            .then(route => controllerUtils.created(res, route))
            .catch(err => controllerUtils.error(res, err))
    },

    retrieve(req, res) {
        return Route
            .findById(req.params.routeId)
            .then(route => {
                if (!route) controllerUtils.notFound(res);
                else controllerUtils.success(res, route)
            })
            .catch((err) => controllerUtils.error(res, err))
    },

    list(req, res) {
        return Route
            .all()
            .then(routes => controllerUtils.success(res, routes))
            .catch(err => controllerUtils.error(res, err));
    },

    active(req, res) {
        return Route
            .findAll({ where: { isAvailable: true } })
            .then(routes => controllerUtils.success(res, routes))
            .catch(err => controllerUtils.error(res, err));
    },

    deactivate(req, res) {
        let where;
        if (req.params.routeId) {
            where = { id: req.params.routeId }
        } else if (req.body.setup_date) {
            where = { setupDate: req.body.setup_date }
        }
        return innerDeactivate(req, res, where);
    }
};

function innerDeactivate(req, res, whereStatement) {
    return Route
        .update({
            isAvailable: false,
            endDate: req.body.end_date || dbHelpers.currentDate()
        }, { where: whereStatement })
        .then(route => controllerUtils.success(res, route))
        .catch((err) => controllerUtils.error(res, err));
}