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
    var username = req.body.user_name
    var password = req.body.password
    console.log(username, password);

    userModel.validSignIn(username, password)
        .then(function(result) {
          console.log("RESULT");
          console.log(result);
            if (username == result[0].username && bcrypt.compareSync(password, result[0].password)) {
                setCookie(res, {dashUsername: username}).then(function() {
                  let id = req.cookies.dashID
                  res.redirect(`/users/${id}`);
                }).catch(function(err) {
                  console.log(err);
                  res.redirect('/users/guest');
                });
            } else {
                res.redirect('/')
            }
        })
});


module.exports = router;
