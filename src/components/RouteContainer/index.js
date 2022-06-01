import Header from '../Header';
import SideBar from '../SideBar';
import { StyledContainer, StyledHeader, HeaderContainer, BodyContainer } from './style';

const RouteContainer = ({ component }) => {
    return (
        <>
            <StyledHeader>
                <Header />
            </StyledHeader>
            <StyledContainer>
                <HeaderContainer>
                    <SideBar />
                </HeaderContainer>
                <BodyContainer>{component}</BodyContainer>
            </StyledContainer>
        </>
    );
};

export default RouteContainer;
