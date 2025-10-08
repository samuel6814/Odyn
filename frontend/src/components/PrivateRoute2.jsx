// in frontend/src/components/PrivateRoute.jsx
import React from 'react';
import ThemedAlert from './ThemedAlert';

const PrivateRoute2 = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  return isAuthenticated ? children : <ThemedAlert />;
};

export default PrivateRoute2;