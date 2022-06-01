import { SideBar, Header, Footer } from '../index';
import { StyledPage } from './style';

const RoutePaging = ({ component }) => {
    return (
        <StyledPage>
            <Header />
            <SideBar />
            <div style={{ gridArea: 'main' }}>{component}</div>
            <Footer />
        </StyledPage>
    );
};

export default RoutePaging;
