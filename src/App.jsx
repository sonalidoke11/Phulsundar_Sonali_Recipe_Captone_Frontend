// src/App.jsx
import React from 'react';
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import RecipeUpload from './pages/RecipeUpload';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const App = () => {
  const [user, setUser] = useState(null); // Manage user state
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state from local storage
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from local storage
    setUser(null); // Update user state to null
    navigate('/'); // Redirect to home page on logout
  }; 

  return(
  <>
    <Navbar user={user} handleLogout={handleLogout} /> {/* Navbar is displayed on every page */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<RecipeList />} />
      <Route path="/recipes/:id" element={<RecipeDetails />} />
      <Route path="/RecipeUpload" element={<RecipeUpload />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn setUser={setUser} />} />
    </Routes>
  </>
  );
};

export default App;
