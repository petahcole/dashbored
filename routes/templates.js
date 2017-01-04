var express = require('express');
var router = express.Router();
var eventful = require("../api/eventful");

var news = require('../api/news');
var eventful = require('../api/eventful');
var maps = require('../api/googlemaps');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/news', function(req, res, next) {
    news.getNews({
            source: 'bbc-news',
            apiKey: 'a405b1953efe426d900f159c7ac4de98'
        })
        .then(body => res.render("news", {
            newsInfo: body,
            layout: false
        }));
});

router.get('/events', function(req, res, next) {
    eventful.getEvents({
        l: 'Denver'
    }).then(body => res.render("events", {
        eventInfo: body,
        layout: false
    }));
});

router.get('/maps', function(req, res, next) {
    maps.findPlace({
            location: '39.742043,-104.991531',
            radius: '500',
            type: 'restaurant'
        })
        .then(body => res.render("maps", {
            mapInfo: body,
            layout: false
        }));
})


module.exports = router;
