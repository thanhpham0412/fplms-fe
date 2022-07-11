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

const CreateMeetingForm = ({ showing, closeFn, form, setForm, groupId }) => {
    const [isLoad, setLoad] = useState(false);

    const [disable, setDisable] = useState(false);

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
                    groupId: groupId,
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
                closeFn();
            });
    };

    const handleChange = (e, field, parser = String) => {
        setForm({
            ...form,
            [field]: parser(e.target.value),
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
                                    handleChange(e, 'date');
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
                                    handleChange(e, 'time');
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
