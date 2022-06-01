import { Container } from './style';

const Overlay = ({ children, showing }) => {
    // if (showing) {
    //     document.body.style.overflow = 'hidden';
    // } else {
    //     document.body.style.overflow = 'auto';
    // }

    return <Container isDisplay={showing}>{children}</Container>;
};

export default Overlay;
