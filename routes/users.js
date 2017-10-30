const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/_helpers');

/* GET users listing. */
router.get('/', authHelpers.loginRequired, function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/admin', authHelpers.adminRequired, function(req, res, next) {
  res.send('admin');
});

module.exports = router;
