import { useContext } from 'react';

import { Outlet, Navigate } from 'react-router-dom';

import AuthContext from '../contexts/auth';

const PrivateRoute = () => {
    const auth = useContext(AuthContext);

    return auth.isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
