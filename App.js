import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage'; // Login component
import FormPage from './FormPage'; // Form component
import TablePage from './TablePage'; // Table component
import ProtectedRoute from './ProtectedRoute'; // ProtectedRoute component

export default function App() {
  return (
    <Router>
      <div className="navigation">
        {/* Conditional navigation links */}
        <Link to="/login">Login</Link> | <Link to="/table">Table</Link>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* ProtectedRoute for TablePage */}
        <Route 
          path="/table" 
          element={
            <ProtectedRoute>
              <TablePage />
            </ProtectedRoute>
          } 
        />
        
        {/* FormPage for Add Employee */}
        <Route 
          path="/form" 
          element={
            <ProtectedRoute>
              <FormPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Default route */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}





    
    
   