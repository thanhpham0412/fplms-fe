import { SideBar, Header } from '../index';
import { StyledPage } from './style';

const RoutePaging = ({ component }) => {
    return (
        <>
            <Header />
            <StyledPage>
                <SideBar />
                <div>{component}</div>
            </StyledPage>
        </>
    );
};

export default RoutePaging;
