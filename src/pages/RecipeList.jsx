// This page shows all recipes from database
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes`); 
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Recipes</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Link to={`/recipes/${recipe._id}`}>
              <h2 className="text-xl font-semibold mb-2 text-blue-600 hover:text-blue-800">
                {recipe.title}
              </h2>
              <p className="text-gray-700">{recipe.description || 'No description available.'}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
