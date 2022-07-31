import EmptyState from '../../assets/EmptyState.svg';
import { Container } from './style';

const NoResult = ({ children }) => {
    return (
        <Container>
            <img src={EmptyState} alt="Empty State" />
            {children}
        </Container>
    );
};

export default NoResult;
