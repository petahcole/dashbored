var express = require('express');
var router = express.Router();
var eventful = require("../api/eventful");
var news = require('../api/news');
var maps = require("../api/googlemaps")
var user = require('../model/user')
var bcrypt = require('bcryptjs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/guest', function(req, res, next){
  res.render('default');
});

router.get('/:id', function(req, res, next){});

router.put('/:id', function(req, res, next){});

router.post('/',function(req, res, next){
var userInfo = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    email: req.body.email,
    joined: new Date()
  }
  user.createUser(userInfo).then(function(result){
    console.log(result);
  })
  console.log(req.body);
  res.json(userInfo)
});



module.exports = router;
