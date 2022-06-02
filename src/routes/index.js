import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { RouteContainer } from '../components';
import ClassList from './ClassList';
import GroupPicking from './GroupPicking';
import Login from './Login';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import StudentList from './StudentList';

export const RouterComponent = ({ isAuth, setAuth }) => {
    const publicRoute = [
        {
            path: 'login',
            name: 'login',
            component: <Login setAuth={setAuth} />,
            exact: true,
            restrict: true,
        },
    ];

    const privateRoute = [
        {
            path: 'class-list',
            name: 'class-list',
            component: <ClassList />,
            exact: true,
            restrict: true,
        },
        {
            path: 'student-list',
            name: 'student-list',
            component: <StudentList />,
            exact: true,
            restrict: true,
        },
        {
            path: 'group-picking',
            name: 'group-picking',
            component: <GroupPicking />,
            exact: true,
            restrict: true,
        },
    ];

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="/class-list" />} />
                <Route exact path="/" element={<PrivateRoute isAuthencated={isAuth} />}>
                    {privateRoute.map((route) => (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={<RouteContainer component={route.component} />}
                            exact={route.exact}
                            restrict={route.restrict}
                        />
                    ))}
                </Route>
                <Route exact path="/" element={<PublicRoute isAuthencated={isAuth} />}>
                    {publicRoute.map((route) => (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={route.component}
                            exact={route.exact}
                            restrict={route.restrict}
                        />
                    ))}
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
