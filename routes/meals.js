const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Meal = require('../models/mealModel');

/* GET single meal by id. with Mongoose */
router.get('/:mealid', async function(req, res, next) {
  // if the meal id isn't valid disply 'No meal found'
  if (!mongoose.isValidObjectId(req.params.mealid)) {
    return res.status(404).render('meal', {
      title: 'No meal found',
      meal: null
    });
  }

  let meal = null;
  try {
    meal = await Meal.findById(req.params.mealid);
  } catch (err) {
    console.error("Error getting meal from our database", err);
    return next(err);
  }
  // If the meal id doesn't exists for some reason, display 'not found meessage'
  if (!meal) {
    return res.status(404).render('meal', {
      title: 'No meal found',
      meal: null
    });
  }
  // otherwise display meal
  res.render('meal', {
    title: meal.mealname,
    meal: meal
  });
});


/* POST new meal using Mongo. */
router.post('/', async function(req, res, next) { 
  const mealData  = {
    mealname: new Date().toDateString() + ": " + req.body.mealType,
    plateImageURL: req.body.plateImageURL,
    description: req.body.description,
  }  
  console.log(req.file);
  
  let newMeal = new Meal(mealData);

  try{
    await newMeal.save()
  }catch(err){
    console.error("Error saving meal to database:", err);
  }
  // Redirect to home page
  res.redirect('/');
});


module.exports = router;
