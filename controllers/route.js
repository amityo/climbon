const Route = require('../models').Route;

module.exports = {
    create(req, res) {
        return Route.create({
            type: req.body.type,
            grade: req.body.grade,
            color: req.body.color
        })
        .then(route => res.status(201).send(route))
        .catch(err => res.status(400).send(err))
    }
}