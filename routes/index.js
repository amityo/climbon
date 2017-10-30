var express = require('express');
var router = express.Router();

routeController = require('../controllers').route

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to the api',
}));

router.post('/api/route', route.create)

module.exports = router;
