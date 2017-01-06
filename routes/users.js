var express = require('express');
var router = express.Router();
var eventful = require("../api/eventful");
var news = require('../api/news');
var maps = require("../api/googlemaps")
var userModel = require('../model/user')
var user = require('../model/user')
var bcrypt = require('bcryptjs')
var userPref = require('../model/user_pref')


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
    userModel.loadDash(req.body.username).then(function(result) {
        res.send(result)
    })
});

router.get('/guest', function(req, res, next) {
    res.render('default');
});

router.get('/:id', function(req, res, next) {
    userModel.loadDash(req.body.username)
    .then(results   =>  {
        res.send(results)
    })
});

router.put('/:id', function(req, res, next) {});

router.post('/', function(req, res, next) {
    var userInfo = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        email: req.body.email,
        joined: new Date()
    }

    var userPrefIds = extractPrefIds(req.body)

    user.createUser(userInfo).then(function(result) {

        var userId = result[0];

        userPref.savePreferences(userId, userPrefIds).then(function(data) {
            res.redirect(`/users/${userId}`);
        })
    })
});


function extractPrefIds(obj) {
    var results = [];
    for (var key in obj) {
        if (!isNaN(key)) {
            results.push(Number(key));

        }
    }
    return results;
}

module.exports = router;
