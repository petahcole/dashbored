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
    userModel.loadDash(req.body.username).then(function(result) {
        res.send(result)
    })
});

router.get('/guest', function(req, res, next) {
    res.render('default');
});

router.get('/:id', function(req, res, next) {
    if (req.cookies.dashId !== req.params.id) {
      let realId = req.cookies.dashId;
      !!realId ? res.redirect(`/users/${realId}`) : res.redirect('/');
    }
    userModel.getUser(req.params.id)
    .then(username =>  {
       userModel.loadDash(username[0].username)
       .then(results    =>  {
           console.log(results)
           res.render("user", {userInfo: results})
       })
    })
});

router.post('/:id', function(req, res, next) {
    console.log(req.body)
});

router.post('/', function(req, res, next) {
  var userInfo = {
         username: req.body.username,
         password: bcrypt.hashSync(req.body.password),
         email: req.body.email,
         joined: new Date()
  }

  var userPrefIds = extractPrefIds(req.body);

     user.createUser(userInfo)
     .then(function(result) {
       console.log('doing other stuff');
       var userId = result[0];
       userPref.savePreferences(userId, userPrefIds).then(function(data) {
         setCookie(res, {dashId: userId}).then(() => {
           res.status(200).json({
             userId,
             message: 'User created!'
           })
         });
       })
   })
    .catch(function(err){
     if (err.constraint === "user_username_unique") {
       res.status(500).send({
         status: 'error',
         message: 'User name taken already!'
       })
     } else if (err.constraint == "user_email_unique"){
       res.send({
         message: 'Email already taken!'
       })
     } else {
       console.log(err);
     }
   })
})

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
