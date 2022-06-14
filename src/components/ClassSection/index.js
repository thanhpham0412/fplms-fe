import { useState, useRef } from 'react';

import axios from 'axios';
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
import BookIcon from '@mui/icons-material/Book';

const ClassSection = ({
    className,
    fullClassName,
    lecture,
    join,
    id,
    enrollKey,
    user,
    subjectId,
}) => {
    const isEnroll = join;
    const [open, setOpen] = useState(false);
    const [isCreate, setCreate] = useState(false);
    const buttonRef = useRef();
    const inputRef = useRef();
    const navigate = useNavigate();
    const classItem = {
        className: className,
        lecture: lecture,
        fullClassName: fullClassName,
        enrollKey: enrollKey,
        subjectId: subjectId,
        id: id,
    };

    useClickOutside(buttonRef, () => {
        if (open == true) {
            setOpen(false);
        }
    });

    const openEnroll = () => {
        if (!isEnroll) {
            inputRef.current.select();
            setOpen(true);
        }
    };

    const enroll = () => {
        const header = {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'text/plain',
        };

        if (isEnroll) {
            const API = process.env.REACT_APP_API_URL + `/management/classes/${id}/groups/details`;
            axios.get(API, { headers: header }).then((res) => {
                const data = res.data.data;
                if (data) {
                    navigate(`/group-view/${data.id}`);
                } else {
                    navigate(`/class/${id}`);
                }
            });
        }

        if (!isEnroll && open && inputRef.current.value === enrollKey) {
            const API = process.env.REACT_APP_API_URL + `/management/classes/${id}/enroll`;
            axios.post(API, enrollKey, { headers: header }).then((res) => {
                if (res.data.code == 200) {
                    navigate(`/class/${id}`);
                }
            });
        } else if (!isEnroll && open) {
            error(`Enroll key is incorrect!`);
            inputRef.current.value = '';
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

    return (
        <>
            <EditClassForm showing={isCreate} setCreate={setCreate} classItem={classItem} />
            <Container isEnroll={isEnroll}>
                <Title>{className}</Title>
                <Row>
                    <BookIcon />
                    <DetailText>{fullClassName}</DetailText>
                </Row>
                <Row>
                    <AccountBoxIcon />
                    <DetailText>{lecture}</DetailText>
                </Row>
                {user.role == 'Lecturer' ? (
                    <Row gap="10px">
                        <StyledButton onClick={handleViewBtn}>View</StyledButton>
                        <StyledButton onClick={handleEditBtn}>Edit</StyledButton>
                    </Row>
                ) : (
                    <Row onClick={openEnroll} ref={buttonRef}>
                        <InputContainer open={open}>
                            <StyledInput ref={inputRef} type="password" placeholder="Enroll Key" />
                        </InputContainer>

                        <StyledButton open={open} onClick={enroll} isEnroll={isEnroll}>
                            <span>{isEnroll ? 'Joined' : 'Enroll'}</span>
                            <ArrowCircleRightIcon />
                        </StyledButton>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default ClassSection;
