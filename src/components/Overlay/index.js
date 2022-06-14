import { Container } from './style';

const Overlay = ({ children, showing, setOpen }) => {
    if (showing) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    const hide = () => {
        setOpen(false);
    };

    return (
        <Container isDisplay={showing} onClick={hide}>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </Container>
    );
};

export default Overlay;
