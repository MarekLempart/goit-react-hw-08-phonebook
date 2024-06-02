// PrivateRoute.jsx

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, redirectTo: addres }) => {
  const { isLoaggedIn, isRefreshing } = useSelector(state => state.auth);
  // Logika sprawdzająca, czy użytkownik powinien być przekierowany
  const shouldRedirect = !isLoaggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={addres} /> : Component;
};
