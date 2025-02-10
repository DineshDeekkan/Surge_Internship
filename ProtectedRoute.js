import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component to guard access to specific routes
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" />;
  }

  // Render children (FormPage or TablePage) if logged in
  return children;
};

export default ProtectedRoute;

