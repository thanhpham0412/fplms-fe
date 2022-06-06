import { useState, useRef } from 'react';

import { useClickOutside } from '../../hooks';
import { Container, StyledButton, StyledList, StyledItem } from './style';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Selection = ({ title, options, placeholder }) => {
    title = title || 'Selection';
    const [picked, setPicked] = useState(placeholder || 'Pick an option');

    const [list] = useState(options || []);
    const [open, setOpen] = useState(false);

    const pick = (item) => {
        setPicked(item.content);
        if (item.fn && typeof item.fn == 'function') item.fn(item);
    };

    const ref = useRef();

    useClickOutside(ref, () => {
        setOpen(false);
    });

    return (
        <Container>
            <small>{title}</small>
            <StyledButton
                open={open}
                ref={ref}
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <span>{picked}</span>
                <KeyboardArrowDownIcon />
            </StyledButton>
            <StyledList open={open}>
                {list.map((item, index) => (
                    <StyledItem
                        onClick={() => {
                            pick(item);
                        }}
                        key={item.value}
                        delay={index * 70}
                    >
                        {item.content}
                    </StyledItem>
                ))}
            </StyledList>
        </Container>
    );
};

export default Selection;
