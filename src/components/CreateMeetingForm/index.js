/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import axios from 'axios';
import moment from 'moment';

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

const CreateMeetingForm = ({ showing, closeFn, groupId }) => {
    const [isLoad, setLoad] = useState(false);

    const [disable, setDisable] = useState(false);

    const [form, setForm] = useState({
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm'),
        groupId: groupId,
        link: '',
        scheduleTime: `${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm')}:00.000`,
        title: '',
    });

    const submit = () => {
        if (disable) return;

        setDisable(true);

        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };

        const API = process.env.REACT_APP_API_URL + '/meetings';
        axios
            .post(
                API,
                {
                    groupId: parseInt(groupId),
                    link: form.link,
                    scheduleTime: `${form.date} ${form.time}:00.000`,
                    title: form.title,
                },
                { headers: header }
            )
            .then((res) => {
                if (res.data.code == 200) {
                    success(`Create meeting successfully!`);
                    setDisable(false);
                    closeFn();
                } else {
                    error(res.data.message);
                    setDisable(false);
                    closeFn();
                }
            })
            .catch(() => {
                error(`An error occured!`);
                setDisable(false);
                closeFn();
            });
    };

    const handleChange = (e, field, parser = String) => {
        setForm({
            ...form,
            [field]: parser(e.target.value),
        });
    };

    const handleDateChange = (e) => {
        setForm({
            ...form,
            date: e.target.value,
        });
    };

    const handleTimeChange = (e) => {
        setForm({
            ...form,
            time: e.target.value,
        });
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
                            <small>Title</small>
                            <StyledInput
                                type="text"
                                placeholder="Meeting Title"
                                onChange={(e) => {
                                    handleChange(e, 'title');
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Meeting url</small>
                            <StyledInput
                                type="url"
                                placeholder="Meeting Link"
                                onChange={(e) => {
                                    handleChange(e, 'link');
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Date</small>
                            <StyledInput
                                type="date"
                                defaultValue={form.date}
                                onChange={(e) => {
                                    handleDateChange(e);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Time</small>
                            <StyledInput
                                type="time"
                                defaultValue={form.time}
                                onChange={(e) => {
                                    handleTimeChange(e);
                                }}
                            />
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
