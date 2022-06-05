import { useLocation } from 'react-router-dom';

import Breadcrumbs from '../Breadcrumbs';
import Header from '../Header';
import SideBar from '../Sidebar';
import { StyledContainer, StyledHeader, HeaderContainer, BodyContainer } from './style';

const RouteContainer = ({ component, routes }) => {
    const location = useLocation();

    const relativeRoutes = routes.map((route) => ({
        relativePath: route.path.split('/').slice(-1)[0],
        name: route.name,
    }));

    console.log(relativeRoutes);

    const paths = location.pathname
        .split('/')
        .filter(Boolean)
        .map((path) => relativeRoutes.includes(path));

    return (
        <>
            <StyledHeader>
                <Header />
            </StyledHeader>
            <StyledContainer>
                <HeaderContainer>
                    <SideBar />
                </HeaderContainer>
                <BodyContainer>
                    <Breadcrumbs crumbs={paths} />
                    {component}
                </BodyContainer>
            </StyledContainer>
        </>
    );
};

export default RouteContainer;
