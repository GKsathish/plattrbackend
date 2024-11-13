const express = require('express');
const Recipe = require('../models/Recipe');

const router = express.Router();

// Get all recipes or filter by category/ingredient
router.get('/recipes', async (req, res) => {
  const { category, ingredient } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (ingredient) filter.ingredients = { $in: [ingredient] };

  try {
    const recipes = await Recipe.find(filter);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new recipe
router.post('/recipes', async (req, res) => {
  const { title, ingredients, instructions, category, cookingTime } = req.body;

  const recipe = new Recipe({ title, ingredients, instructions, category, cookingTime });

  try {
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a recipe
router.put('/recipes/:id', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a recipe
router.delete('/recipes/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
