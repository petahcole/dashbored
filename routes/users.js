var express = require('express');
var router = express.Router();
var eventful = require("../api/eventful");
var news = require('../api/news');
var maps = require("../api/googlemaps")
var userModel = require('../model/user')
var user = require('../model/user')
var bcrypt = require('bcryptjs')
var userPref = require('../model/user_pref')
var setCookie = require('../helpers/set-cookie');


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
    userModel.getUser(req.params.id)
    .then(username    =>  {
       userModel.loadDash(username[0].username)
       .then(results    =>  {
           console.log(results[0])
           res.render("user", {userInfo: results[0]})
       })
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

    var userPrefIds = extractPrefIds(req.body);

    user.createUser(userInfo).then(function(result) {
        var userId = result[0];
        userPref.savePreferences(userId, userPrefIds).then(function(data) {
            setCookie(res, userId);
            res.redirect(`/users/${userId}`);
        });
    });
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
