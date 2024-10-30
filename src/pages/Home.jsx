import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [carouselImages]); // Depend on carouselImages

  // Fetch random images from Unsplash API
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?count=3&query=recipe&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        const images = data.map((image) => image.urls.regular); // Get the regular-sized image URLs
        setCarouselImages(images);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCarouselImages();
  }, []);



  // Fetch the latest three recipes from database 
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        const latestRecipes = data.slice(-3).reverse(); // Show the latest three recipes
        setRecipes(latestRecipes);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="p-6">
      {/* Carousel Section for showing random images from externa API */}
      <div className="carousel-container mb-6 relative">
        <img
          src={carouselImages[currentImageIndex]}
          alt="Carousel"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Discover Our Latest Recipes</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* SHowing latest 3 Recipes in Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            to={`/recipes/${recipe._id}`}
            key={recipe._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={
                recipe.image
                  ? `${import.meta.env.VITE_API_BASE_URL}/${recipe.image}`
                  : ''
              }
              alt={recipe.title}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
              <p className="text-gray-600 mt-2 text-sm">{recipe.description || 'No description available'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
