import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthencated }) => {
    return isAuthencated ? <Navigate to="/class-list" /> : <Outlet />;
};

export default PublicRoute;
