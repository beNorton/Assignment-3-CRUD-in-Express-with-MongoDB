const express = require('express');
const router = express.Router();
const Meal = require('../models/mealModel');

/* GET single meal by id. */
router.get('/:mealid', (req, res, next)=>{
  const id = parseInt(req.params.mealid);
  const selectedMeal = req.app.locals.meals.find(m => m.id === id);
  const mealTitle = selectedMeal.meal;
  res.render('meal', {
    title: mealTitle,
    description: selectedMeal.description,
    plateImageURL: selectedMeal.plateImageURL
  });
});

/* POST new photo using Mongo. */
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