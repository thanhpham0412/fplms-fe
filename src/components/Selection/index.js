import { useState, useEffect } from 'react';

import { Container, StyledButton, StyledList, StyledItem } from './style';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Selection = ({ title, options, placeholder }) => {
    title = title || 'Selection';
    placeholder = placeholder || 'Pick an option';

    const [list] = useState(options || []);
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

    useEffect(() => {
        document.addEventListener('click', close);
        return () => {
            document.removeEventListener('click', close);
        };
    }, [open]);

    return (
        <Container>
            <small>{title}</small>
            <StyledButton
                open={open}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
            >
                <span>{placeholder}</span>
                <KeyboardArrowDownIcon />
            </StyledButton>
            <StyledList open={open}>
                {list.map((item, index) => (
                    <StyledItem key={item.value} delay={index * 50}>
                        {item.content}
                    </StyledItem>
                ))}
            </StyledList>
        </Container>
    );
};

export default Selection;
