import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthencated }) => {
    return isAuthencated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
