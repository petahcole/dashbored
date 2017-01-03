var express = require('express');
var router = express.Router();
var eventful = require("../api/eventful");
var webhose = require('../api/webhose');
var maps = require("../api/googlemaps")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/guest', function(req, res, next){
  webhose.getNews({site_category: 'social'}).then(body => res.json(body));

});

router.get('/:id', function(req, res, next){});

router.put('/:id', function(req, res, next){});

router.post('/', function(req, res, next){});




module.exports = router;
