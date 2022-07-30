import { useContext } from 'react';

import { Outlet, Navigate } from 'react-router-dom';

import AuthContext from '../contexts/auth';
import { getTokenInfo } from '../utils/account';

const PrivateRoute = () => {
    const auth = useContext(AuthContext);
    const user = getTokenInfo();
    console.log(user);
    return auth.isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
