var express = require('express');
var knex = require('../db/db_connection');
var router = express.Router();
var userModel = require('../model/user');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/login', function(req, res, next) {
    var username = req.body.username
    var password = req.body.password

    userModel.validSignIn(username, password)
        .then(function(result) {
            if (username == result[0].username && bcrypt.compareSync(password, result[0].password)) {
                res.redirect('/users/:id')
            } else {
                res.render('error')
            }
        })
});

module.exports = router;
