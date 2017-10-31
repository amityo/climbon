const express = require('express');
const router = express.Router();
const mid = require('../auth/middlewares');

/* GET users listing. */
router.get('/', mid.loginRequired, function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/admin', mid.adminRequired, function (req, res, next) {
	res.send('admin');
});

module.exports = router;
