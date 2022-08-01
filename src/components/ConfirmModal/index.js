import Overlay from '../Overlay';
import { Button, ButtonList, Container, Title } from './style';

import CloseIcon from '@mui/icons-material/Close';

const ConfirmModal = ({ isOpen, setIsOpen, action }) => {
    const handleYes = async () => {
        action();
    };

    return (
        <Overlay isOpen={isOpen}>
            <Container>
                <CloseIcon onClick={() => setIsOpen(false)} />
                <Title>Do you want to continue? This will permantly deleted!</Title>
                <ButtonList>
                    <Button onClick={handleYes}>Yes</Button>
                    <Button onClick={() => setIsOpen(false)}>No</Button>
                </ButtonList>
            </Container>
        </Overlay>
    );
};

export default ConfirmModal;
