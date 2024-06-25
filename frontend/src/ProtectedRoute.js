import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = () => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading indicator
  }

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
