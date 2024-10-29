// This page gives a form to upload a recipe after login 
import React, { useState } from 'react';
import "../App.css";

const RecipeUpload = ({ user }) => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    cookingTime: '',
    category: 'Breakfast',
    image: '',
  });
  const [message, setMessage] = useState('');

  const token = user?.token || localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null; // Accessing token from local storage for authorization to post recipe

  const handleChange = (e) => {
    setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Converting ingredients and cooking steps to arrays
    const ingredientsArray = recipeData.ingredients.split(',').map((item) => item.trim());
    const stepsArray = recipeData.steps.split(',').map((item) => item.trim());

    // Create new recipe object with data and ingredientArray and stepsArray
    const newRecipe = {
      ...recipeData,
      ingredients: ingredientsArray,
      steps: stepsArray,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Using token from local storage
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        const savedRecipe = await response.json();
        setMessage('Recipe added successfully!');
        setRecipeData({
          title: '',
          description: '',
          ingredients: '',
          steps: '',
          cookingTime: '',
          category: 'Breakfast',
          image: '',
        });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Failed to upload recipe:', error);
      setMessage('Failed to upload recipe. Please try again later.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={recipeData.title} onChange={handleChange} placeholder="Title" required className="input" />
        <textarea name="description" value={recipeData.description} onChange={handleChange} placeholder="Description" className="input" />
        <input type="text" name="ingredients" value={recipeData.ingredients} onChange={handleChange} placeholder="Ingredients (comma separated)" required className="input" />
        <input type="text" name="steps" value={recipeData.steps} onChange={handleChange} placeholder="Steps (comma separated)" required className="input" />
        <input type="number" name="cookingTime" value={recipeData.cookingTime} onChange={handleChange} placeholder="Cooking Time (minutes)" required className="input" />
        <select name="category" value={recipeData.category} onChange={handleChange} className="input">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
          <option value="Snack">Snack</option>
        </select>
        <input type="text" name="image" value={recipeData.image} onChange={handleChange} placeholder="Image URL" className="input" />
        <button type="submit" className="btn mt-4">Submit Recipe</button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
};

export default RecipeUpload;
