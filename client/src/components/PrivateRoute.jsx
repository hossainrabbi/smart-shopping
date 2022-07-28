import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ userRole }) => {
  const auth = useSelector((store) => store.auth);
  const location = useLocation();

  return auth?.user?.user?.roles.some((authRole) => authRole === userRole) ? (
    <Outlet />
  ) : auth?.user?.token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
