import { useRef } from 'react';

import { Container, StyledInputContainer } from './style';

import AddIcon from '@mui/icons-material/Add';

const InputNumber = () => {
    const ref = useRef();

    return (
        <Container ref={ref}>
            <AddIcon />
            <StyledInputContainer></StyledInputContainer>
            <AddIcon />
        </Container>
    );
};

export default InputNumber;
