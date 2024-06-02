// RestrictedRoute.jsx

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoaggedIn } = useSelector(state => state.auth);

  return isLoaggedIn ? <Navigate to={redirectTo} /> : Component;
};
