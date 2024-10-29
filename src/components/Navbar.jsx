import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => (
  <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
    {/* LOGO POSITION */}
    <div className="text-lg font-bold">
      <Link to="/" className="hover:text-blue-200">
        MyRecipeApp
      </Link>
    </div>

    {/* MENUBAR/LINKS */}
    <div className="space-x-4">
      <Link to="/" className="hover:text-blue-200">
        Home
      </Link>
      <Link to="/recipes" className="hover:text-blue-200">
        Recipes
      </Link>
      {/* If user is logged in upload receipe will show up */}
      {user ? (
      <Link to="/RecipeUpload" className="hover:text-blue-200">
        Upload Receipe
      </Link>
      ):("")}
      {/* If user is logged in, login and sign will hide and logout will show up */}
      {user ? (
        <div className="flex items-center space-x-4">
          <span>Welcome, {user.name}!</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link to="/signin" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
            Sign In
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
            Sign Up
          </Link>
        </>
      )}
    </div>
  </nav>
);

export default Navbar;
