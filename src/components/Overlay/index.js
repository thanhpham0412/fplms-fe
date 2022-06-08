import { Container } from './style';

const OverlayContainer = () => {
    return <div></div>;
};

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
            <div onClick={(e) => e.stopPropagation()}>{showing ? children : null}</div>
        </Container>
    );
};

export { OverlayContainer };

export default Overlay;
