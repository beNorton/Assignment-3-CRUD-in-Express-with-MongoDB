const express = require('express');
const router = express.Router();

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

/* POST Meal to food diary. */
router.post('/', function(req, res, next) { 
  const { mealType, description, plateImageURL } = req.body;
 
  /* Generate a new id (simple approach: max id + 1)
     borrowed from class lecture. */
  const newId = req.app.locals.meals.length > 0 
    ? Math.max(...req.app.locals.meals.map(p => p.id)) + 1 
    : 1;

  /* Create new Meal object adding current date to meal type for display purposes */
  const newMeal = {
    id: newId,
    meal : new Date().toDateString() + ": " + mealType,
    description,
    plateImageURL
  };

  /* Add to Meal to food diary array */
  req.app.locals.meals.push(newMeal);
  
  /* Redirect to home page */
  res.redirect('/');
});

module.exports = router;