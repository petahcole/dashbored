var express = require('express');
var router = express.Router();
var api = require("../api/api")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/guest', function(req, res, next){
  api.getEvents(`http://www.google.com`);  
    res.send("any string")
  
});

router.get('/:id', function(req, res, next){});

router.put('/:id', function(req, res, next){});

router.post('/', function(req, res, next){});

// router.get('/guest', function(){
//   // api.getEvents(`http://www.google.com`);  
//     res.send("any string")
  
// });


module.exports = router;
