var express = require('express');
var router = express.Router();
var eventful = require("../api/eventful");
var webhose = require('../api/webhose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/news', function(req, res, next) {
  webhose.getNews({
    site_type: 'news',
    size: 50,
    site_category: 'social'
  })
    .then(function(body) {
      res.json(body);
    });
});


module.exports = router;
