import { useContext } from 'react';

import axios from 'axios';
import { Outlet, Navigate } from 'react-router-dom';

import AuthContext from '../contexts/auth';

const PrivateRoute = () => {
    const auth = useContext(AuthContext);

    /*axios
        .get(process.env.REACT_APP_API_URL + '/valid/role', {
            headers: { Authorization: `bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
                const role = res.data.data;
                auth.setRole(role);
            } else {
                localStorage.removeItem('token');
                auth.setAuth(false);
            }
        });*/

    return auth.isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
