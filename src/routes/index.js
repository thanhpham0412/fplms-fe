import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { RouteContainer } from '../components';
import DiscussionList from './DiscussionList';
import Login from './Login';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const publicRoute = [
    {
        path: 'login',
        name: 'login',
        component: Login,
        exact: true,
        restrict: true,
    },
];

export const privateRoute = [
    {
        path: 'discussion-list',
        name: 'discussion-list',
        component: DiscussionList,
        exact: true,
        restrict: true,
    },
];

export const RouterComponent = () => {
    const routes = publicRoute.concat(privateRoute);

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="/class-list" />} />
                <Route exact path="/" element={<PrivateRoute />}>
                    {privateRoute.map((route) => (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={
                                <RouteContainer routes={routes} component={<route.component />} />
                            }
                            exact={route.exact}
                            restrict={route.restrict}
                        />
                    ))}
                </Route>
                <Route exact path="/" element={<PublicRoute />}>
                    {publicRoute.map((route) => (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={<route.component />}
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
