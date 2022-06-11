import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { RouteContainer } from '../components';
import ClassList from './ClassList';
import DiscussionList from './DiscussionList';
import GroupPicking from './GroupPicking';
import GroupView from './GroupView';
import Login from './Login';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import StudentList from './StudentList';

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
        path: 'class-list',
        name: 'class-list',
        component: ClassList,
        exact: true,
        restrict: true,
    },
    {
        path: 'student-list',
        name: 'student-list',
        component: StudentList,
        exact: true,
        restrict: true,
    },
    {
        path: '/class/:id',
        name: 'group-picking',
        component: GroupPicking,
        exact: true,
        restrict: true,
    },
    {
        path: 'group-view/:id',
        name: 'group-view',
        component: GroupView,
        exact: true,
        restrict: true,
    },
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
