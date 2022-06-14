import { useState, useRef } from 'react';

import { useClickOutside } from '../../hooks';
import { post } from '../../utils/request';
import { error } from '../../utils/toaster';
import {
    Container,
    Title,
    Row,
    DetailText,
    StyledButton,
    StyledInput,
    InputContainer,
} from './style';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

const ClassSection = ({ className, fullClassName, lecture, join, id, subjectId }) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef();
    const inputRef = useRef();

    useClickOutside(buttonRef, () => {
        if (open == true) {
            setOpen(false);
        }
    });

    const openEnroll = () => {
        if (!join) {
            inputRef.current.select();
            setOpen(true);
        }
    };

    const enroll = () => {
        if (!join && open) {
            if (inputRef.current.value.trim().length) {
                post(`/management/classes/${id}/enroll`, {
                    enrollKey: inputRef.current.value,
                }).then((response) => {
                    const data = response.data;
                    if (data.code == 400) {
                        error(data.message);
                    }
                });
            } else {
                error('Enroll key cannot blank');
            }
            inputRef.current.value = '';
        }
    };

    return (
        <Container isEnroll={join}>
            <Title>{className}</Title>
            <Row>
                <AcUnitIcon />
                <DetailText>{fullClassName}</DetailText>
            </Row>
            <Row>
                <AccountBoxIcon />
                <DetailText>{lecture}</DetailText>
            </Row>
            <Row>
                <CollectionsBookmarkIcon />
                <DetailText>{subjectId}</DetailText>
            </Row>
            <Row onClick={openEnroll} ref={buttonRef} gap="0px">
                <InputContainer open={open}>
                    <StyledInput ref={inputRef} type="password" placeholder="Enroll Key" />
                </InputContainer>
                <StyledButton open={open} isEnroll={join}>
                    <span>{join ? 'Joined' : 'Enroll'}</span>
                    <ArrowCircleRightIcon onClick={enroll} />
                </StyledButton>
            </Row>
        </Container>
    );
};

export default ClassSection;
