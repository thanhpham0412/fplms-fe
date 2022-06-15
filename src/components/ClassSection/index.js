/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState, useRef } from 'react';

import axios from 'axios';

import { getTokenInfo } from '../../utils/account';
import { useNavigate } from 'react-router-dom';

import { useClickOutside } from '../../hooks';
import { error } from '../../utils/toaster';
import EditClassForm from '../EditClassForm';
// import { error } from '../../utils/toaster';
import {
    Container,
    Title,
    Row,
    DetailText,
    StyledButton,
    StyledInput,
    InputContainer,
} from './style';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BookIcon from '@mui/icons-material/Book';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

const ClassSection = ({ className, fullClassName, lecture, join, id, subjectId, subjectsCode }) => {
    const [open, setOpen] = useState(false);
    const [isCreate, setCreate] = useState(false);
    const buttonRef = useRef();
    const inputRef = useRef();
    const navigate = useNavigate();

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

    const user = getTokenInfo();

    const enroll = () => {
        const header = {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'text/plain',
        };
        if (!join && open) {
            if (inputRef.current.value.trim().length) {
                const API = process.env.REACT_APP_API_URL + `/management/classes/${id}/enroll`;
                const enrollKey = inputRef.current.value;
                axios
                    .post(API, enrollKey, {
                        headers: header,
                    })
                    .then((response) => {
                        const data = response.data;
                        console.log(data);
                        if (data.code == 400) {
                            error(data.message);
                            inputRef.current.value = '';
                        } else if (data.code == 200) {
                            navigate(`/class/${id}`);
                        }
                    });
            } else {
                error('Enroll key cannot blank');
            }
        }

        // if (!isEnroll && open) {
        //     error('Wrong enroll key!');
        //     inputRef.current.value = '';
        // }
    };

    const handleViewBtn = () => {
        navigate(`/class/${id}`);
    };

    const handleEditBtn = () => {
        setCreate(true);
    };

    const joinClass = () => {
        if (join) {
            navigate(`/class/${id}`);
        }
    }

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
                <DetailText>{subjectsCode.filter((s) => s.value == subjectId)[0]?.content}</DetailText>
            </Row>
            <Row onClick={openEnroll} ref={buttonRef} gap="0px">
                <InputContainer open={open}>
                    <StyledInput ref={inputRef} type="password" placeholder="Enroll Key" />
                </InputContainer>
                <StyledButton open={open} isEnroll={join} onClick={joinClass}>
                    {user.role == 'Student' ? (
                        <span>{join ? 'Joined' : 'Enroll'}</span>
                    ) : (
                        <span>View</span>
                    )}
                    <ArrowCircleRightIcon onClick={enroll} />
                </StyledButton>
            </Row>
        </Container>
    );
};

export default ClassSection;
