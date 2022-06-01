import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import ClassList from './ClassList';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const publicRoute = [
    {
        path: 'not-found',
        name: 'not-found',
        component: <NotFound />,
        exact: true,
        restrict: true,
    },
];

export const privateRoute = [
    {
        path: 'class-list',
        name: 'class-list',
        component: <ClassList />,
        exact: true,
        restrict: true,
    },
];

export const RouterComponent = ({ isAuth }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="/class-list" />} />
                <Route exact path="/" element={<PrivateRoute isAuthencated={isAuth} />}>
                    {privateRoute.map((route) => (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={route.component}
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
