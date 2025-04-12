import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import './Pages.css';

const Auth = () => {
  return (
    <motion.div
      className="page-container auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Decorative Shapes and Patterns */}
      <div className="booking-shapes">
        <div className="booking-shape booking-shape-1"></div>
        <div className="booking-shape booking-shape-2"></div>
        <div className="booking-shape booking-shape-3"></div>
        <div className="booking-shape booking-shape-4"></div>
      </div>
      <div className="dots-pattern"></div>
      
      {/* Additional wavy shapes */}
      <div className="wavy-shapes">
        <div className="wavy-shape wavy-shape-1"></div>
        <div className="wavy-shape wavy-shape-2"></div>
      </div>
      
      <div className="page-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </div>
    </motion.div>
  );
};

export default Auth; 