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
           console.log(results[0])
           res.render("user", {userInfo: results[0]})
       })
    })
});

router.put('/:id', function(req, res, next) {});


function validUser(user){
  const validUserName = typeof user.username == 'string' &&
                      user.username.trim() != '';
  const validEmail = typeof user.email == 'string' &&
                      user.email.trim() != '';
  const validPassword = typeof user.password == 'string' &&
                      user.password.trim() != '' &&
                      user.password.trim().length >= 5;
  return validEmail && validPassword && validUserName
}

router.post('/', function(req, res, next) {
    var userInfo = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        email: req.body.email,
        joined: new Date()
    }

    if (validUser(req.body)) {
      user.validSignUp(req.body.email)
        .then(result => {
          if (result.length != 0) {
            // this is unique
            //then hash password
            bcrypt.hash(req.body.password, 10)
              .then((hash) => {
                //store hash in passwrod db
                var userPrefIds = extractPrefIds(req.body)
                user.createUser(userInfo).then(function(result) {
                  var userId = result[0];
                  userPref.savePreferences(userId, userPrefIds).then(function(data) {
                    setCookie(res, {dashId: userId}).then(() => {
                      res.redirect(`/users/${userId}`);
                    });
                  })
                })
              })
          } else {
            next(new Error('email or username already in use'))
          }
        })
    } else {
      next(new Error('Invalid user'))
    }
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
