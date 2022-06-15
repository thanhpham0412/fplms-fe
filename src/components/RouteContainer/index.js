import Header from '../Header';
import SideBar from '../Sidebar';
import { StyledContainer, StyledHeader, HeaderContainer, BodyContainer } from './style';

const RouteContainer = ({ component }) => {
    return (
        <>
            <StyledContainer>
                <StyledHeader>
                    <Header />
                </StyledHeader>
                <HeaderContainer>
                    <SideBar />
                </HeaderContainer>
                <BodyContainer>{component}</BodyContainer>
            </StyledContainer>
        </>
    );
};

export default RouteContainer;
