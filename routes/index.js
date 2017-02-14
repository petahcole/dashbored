var express = require('express');
var knex = require('../db/db_connection');
var router = express.Router();
var userModel = require('../model/user');
var setCookie = require('../helpers/set-cookie');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.cookies.dashId) {
      let id = req.cookies.dashId;
      res.redirect(`users/${id}`);
    } else {
      res.render('index');
    }
});

router.post('/login', function(req, res, next) {
    if (!req.body.password || req.body.password.length < 5) {
      res.render('index', {errorMessage: 'Username or password not valid'});
    }
    if (!req.body.user_name || req.body.user_name.length === 0) {
      res.render('index', {errorMessage: 'Username or password not valid'});
    }

    var username = req.body.user_name
    var password = req.body.password

    userModel.validSignIn(username, password)
        .then(function(result) {
            if (username == result[0].username && bcrypt.compareSync(password, result[0].password)) {
                setCookie(res, {dashUsername: username}).then(function() {
                  let id = req.cookies.dashID
                  res.redirect(`/users/${id}`);
                }).catch(function(err) {
                  res.redirect('/users/guest');
                });
            } else {
                res.redirect('/')
            }
        })
});

router.get('/logout', function(req, res, next) {
    res.clearCookie('dashId')
    res.redirect('/')
})


module.exports = router;
