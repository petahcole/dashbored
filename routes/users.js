var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(){});

router.put('/:id', function(){});

router.post('/', function(){});

router.get('/guest', function(){});


module.exports = router;
