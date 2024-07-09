import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../functions/auth/authContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
