var express = require('express');
var knex = require('../db/db_connection');
var router = express.Router();
var userModel = require('../model/user');
var setCookie = require('../helpers/set-cookie');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/login', function(req, res, next) {
    var username = req.body.user_name
    var password = req.body.password
    console.log(username, password);

    userModel.validSignIn(username, password)
        .then(function(result) {
          console.log(result);
            if (username == result[0].username && bcrypt.compareSync(password, result[0].password)) {
                setCookie(res, {dashUser: username});
                res.redirect('/users/guest')
            } else {
                res.redirect('/')
            }
        })
});

module.exports = router;
