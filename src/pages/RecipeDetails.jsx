// this page gives receipe details 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  if (!recipe) {
    return <p className="text-center mt-6">Loading...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <p className="text-gray-600 mb-4">{recipe.description || 'No description available.'}</p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-6">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-600">{ingredient}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Steps</h2>
        <ol className="list-decimal list-inside space-y-2">
          {recipe.steps.map((step, index) => (
            <li key={index} className="text-gray-600">{step}</li>
          ))}
        </ol>

        <div className="mt-6">
          <span className="font-semibold text-gray-700">Cooking Time:</span> {recipe.cookingTime} minutes
        </div>
        <div className="mt-2">
          <span className="font-semibold text-gray-700">Category:</span> {recipe.category}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
