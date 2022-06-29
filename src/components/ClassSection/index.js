/* eslint-disable no-unused-vars */

/* eslint-disable prettier/prettier */
import { useState, useRef } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useClickOutside } from '../../hooks';
import { getTokenInfo } from '../../utils/account';
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
    MiniDetails,
    Email,
    JoinButton,
    Front,
    Back,
} from './style';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const ClassSection = ({ name, lecture, join, id, subjectId, semesterCode }) => {
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
            setOpen(true);
        }
    };

    const focus = () => {
        inputRef.current.select();
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
        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };
        if (user.role == 'Lecturer') {
            navigate(`/class/${id}`);
        }
        if (join) {
            const API = process.env.REACT_APP_API_URL + `/management/classes/${id}/groups/details`;
            axios.get(API, { headers: header }).then((res) => {
                const data = res.data.data;
                if (data) {
                    navigate(`/class/${id}/group/${data.id}`);
                } else {
                    navigate(`/class/${id}`);
                }
            });
        }
    };

    return (
        <Container isEnroll={join}>
            <Row>
                <DetailText>{subjectId}</DetailText>
            </Row>
            <MiniDetails>
                <Row>
                    <Title>{name}</Title>
                </Row>
                <Row>
                    <Email>{lecture}</Email>
                </Row>
                <Row>
                    <Email>{semesterCode}</Email>
                </Row>
            </MiniDetails>
            <Row onClick={openEnroll} ref={buttonRef}>
                <StyledButton open={open} onClick={joinClass}>
                    <Front onClick={focus} isEnroll={join}>
                        {user.role == 'Student' ? join ? 'OPEN' : 'ENROLL' : 'VIEW'}
                    </Front>
                    <Back>
                        <StyledInput ref={inputRef} type="password" placeholder="Enroll Key" />
                        <JoinButton onClick={enroll}>
                            <DoubleArrowIcon />
                        </JoinButton>
                    </Back>
                </StyledButton>
            </Row>
        </Container>
    );
};

export default ClassSection;
