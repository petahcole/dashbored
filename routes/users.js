var express = require('express');
var router = express.Router();
var eventful = require("../api/eventful");
var news = require('../api/news');
var maps = require("../api/googlemaps")
var userModel = require('../model/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
    userModel.loadDash(req.body.username).then(function(result) {
        res.send(result)
=======
    userModel.loadDash('mycroquet').then(function(result) {
        res.send("working")
>>>>>>> accd277fea0bcfe38f91a75b32881e807939699b
    })
});

router.get('/guest', function(req, res, next) {
    res.render('default');
});

router.get('/:id', function(req, res, next) {});

router.put('/:id', function(req, res, next) {});

router.post('/', function(req, res, next){
  res.send('received something');
});

router.post('/', function(req, res, next) {});





module.exports = router;
