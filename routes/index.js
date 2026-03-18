var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'What Did I Eat Today?',
    foodDiary: req.app.locals.foodDiary
  });
});

module.exports = router;
