import { useEffect, useRef, useState } from 'react';

import useClickOutside from '../../hooks/useClickOutSide';
import { Container, OptContainer, Option, Selected } from './style';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Selection = ({ arr, label }) => {
    const [isDisplay, setDisplay] = useState(false);
    const [click, setClick] = useState(0);
    const [select, setSelect] = useState(label);
    const selectRef = useRef();
    useClickOutside(selectRef, () => {
        if (isDisplay == true) {
            setDisplay(false);
        }
    });
    const handleClick = () => {
        setClick(click + 1);
    };
    useEffect(() => {
        if (click == 1) {
            setDisplay(true);
        } else {
            setDisplay(false);
            setClick(0);
        }
    }, [click]);
    return (
        <>
            <Container onClick={handleClick}>
                <Selected>
                    <Option>{select}</Option>
                    <KeyboardArrowDownIcon />
                </Selected>
                <OptContainer isDisplay={isDisplay} ref={selectRef}>
                    {arr.map((data, index) => (
                        <Option key={index} onClick={() => setSelect(data)}>
                            {data}
                        </Option>
                    ))}
                </OptContainer>
            </Container>
        </>
    );
};

export default Selection;
