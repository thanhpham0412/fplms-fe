import { Container } from './style';

const Overlay = ({ children, showing }) => {
    if (showing) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    const hide = () => {
        console.log(showing);
    };

    return (
        <Container isDisplay={showing} onClick={hide}>
            {children}
        </Container>
    );
};

export default Overlay;
