const express = require('express');
const router = express.Router();
const routesController = require('../controllers').routes;

const mid = require('../auth/middlewares');

/* Get all routes */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/', routesController.create);

router.get('/:routeId', (req, res, next) => {})

router.get('/:active', (req, res, next) => {});

module.exports = router;
