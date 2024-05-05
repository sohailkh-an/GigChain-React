import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = React.memo(({ element: Element, ...rest }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <Element {...rest} /> : <Navigate to="/signIn" replace />;
});

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute;
