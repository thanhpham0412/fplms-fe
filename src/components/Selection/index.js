import { useState, useRef } from 'react';

import { useClickOutside } from '../../hooks';
import { COLOR } from '../../utils/style';
import { Spinner } from '../Spinner';
import { Container, StyledButton, StyledList, StyledItem } from './style';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Selection = ({ options, placeholder, onChange, disable, reset, maxHeight, isLoad }) => {
    const [picked, setPicked] = useState(placeholder || 'Pick an option');
    const [open, setOpen] = useState(false);

    isLoad = isLoad || false;

    const pick = (item) => {
        if (!reset) setPicked(item.content);
        if (item.fn && typeof item.fn == 'function') item.fn(item);
        if (onChange && typeof onChange == 'function') onChange(item);
    };

    const ref = useRef();

    useClickOutside(ref, () => {
        setOpen(false);
    });

    return (
        <Container>
            <StyledButton
                disable={disable}
                open={open}
                ref={ref}
                isLoad={isLoad}
                onClick={() => {
                    if (disable || isLoad) return;
                    setOpen(!open);
                }}
            >
                <span>{picked}</span>
                {isLoad ? <Spinner radius={19} color={COLOR.blue[0]} /> : <KeyboardArrowDownIcon />}
            </StyledButton>
            <StyledList open={open} maxHeight={maxHeight}>
                {options.map((item, index) => (
                    <StyledItem
                        onClick={() => {
                            pick(item);
                            setOpen(false);
                        }}
                        key={item.value}
                        open={open}
                        delay={index * 60}
                    >
                        {item.content}
                    </StyledItem>
                ))}
            </StyledList>
        </Container>
    );
};

export default Selection;
