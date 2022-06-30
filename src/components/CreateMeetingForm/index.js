/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import axios from 'axios';

import { get } from '../../utils/request';
import { COLOR } from '../../utils/style';
import { error, success } from '../../utils/toaster';
import Overlay from '../Overlay';
import Selection from '../Selection';
import { Spinner } from '../Spinner';
import {
    Container,
    StyledHeader,
    StyledJumbotron,
    Title,
    SubTitle,
    Col,
    Row,
    StyledInput,
    StyledBody,
    StyledButton,
    DataHeader,
    Error,
} from './style';

import CloseIcon from '@mui/icons-material/Close';

const CreateMeetingForm = ({ showing, closeFn, form }) => {
    const [isLoad, setLoad] = useState(true);

    const [disable, setDisable] = useState(false);

    const submit = () => {
        if (disable) return;

        setDisable(true);

        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };

        const API = process.env.REACT_APP_API_URL + '/management/classes';
    };

    return (
        <Overlay isOpen={showing} closeFn={closeFn}>
            <Container>
                <StyledHeader>
                    <StyledJumbotron>
                        <Title>CREATE NEW MEETING</Title>
                        <SubTitle>New Meeting</SubTitle>
                    </StyledJumbotron>
                    <CloseIcon onClick={closeFn} />
                </StyledHeader>
                <StyledBody>
                    <Row>
                        <Col>
                            <small>Date</small>
                            <StyledInput type="date" defaultValue={form.date} readOnly={true} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Time</small>
                            <StyledInput type="time" defaultValue={form.time} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledButton onClick={submit}>
                                {disable || isLoad ? (
                                    <Spinner radius={24} color={COLOR.primary02} />
                                ) : (
                                    'CREATE MEETING'
                                )}
                            </StyledButton>
                        </Col>
                    </Row>
                </StyledBody>
            </Container>
        </Overlay>
    );
};

export default CreateMeetingForm;
