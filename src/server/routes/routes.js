const express = require('express');
const router = express.Router();

const routesController = require('../controllers').routes;
const mid = require('../auth/middlewares');

/**
 * Get all the routes.
 */
router.get('/', routesController.list);

/**
 * Create a new route.
 */
router.post('/', mid.adminRequired, routesController.create);

/**
 * Get route by routeId.
 */
router.get('/:routeId(\\d+)/', routesController.retrieve);

/**
 * Get all active routes.
 */
router.get('/active', routesController.active);

/**
 * Deactivates route.
 * @param {integer} [routeId] - The route to deactivate.
 * @param {date} [setupDate] - Deactivate by setup date.  
 * @param {date} [endDate] - Set the end date. Today if not specified.  
*/ 
router.post('/deactivate/:routeId?', mid.adminRequired, routesController.deactivate);

module.exports = router;
