var express = require('express');
var router = express.Router();
const Meal = require('../models/mealModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const meals = await Meal.find();



    res.render('index', {
      title: 'What Did I Eat Today?',
      meals: meals.map((meal) => ({
        id: meal._id.toString(),
        meal: meal.mealname,
      })),
    });
  } catch (err) {
    next(err);
  }
});



module.exports = router;
