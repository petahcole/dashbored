var express = require('express');
var router = express.Router();
var eventful = require("../api/eventful");

var webhose = require('../api/webhose');
var eventful = require('../api/eventful');
var maps = require('../api/googlemaps');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/news', function(req, res, next) {
  webhose.getNews({site_category: 'social'}).then(body => res.json(body));
});

router.get('/events', function(req, res, next) {
  eventful.getEvents({l: 'Denver'}).then(body => res.json(body));
});

router.get('/maps', function(req, res, next) {
  maps.findPlace({
    location: '39.742043,-104.991531',
    radius: '500',
    type: 'restaurant',
    key: 'AIzaSyBd50SVB3miUFoYCAPeJ_-Kw1OJj5LW48U'
  })
  .then(body => res.json(body));
})


module.exports = router;
