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

const CreateClassForm = ({ showing, setCreate, setClass, date }) => {
    const [form, setForm] = useState({
        date: date.toISOString().substr(0, 10),
        time: '00:00',
    });

    const [isLoad, setLoad] = useState(true);

    const close = () => {
        setCreate(false);
    };

    const [disable, setDisable] = useState(false);

    const handleChange = (e, field, parser = String) => {
        setForm({
            ...form,
            [field]: parser(e.target.value),
        });
    };

    const submit = () => {
        if (disable) return;

        setDisable(true);

        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };

        const API = process.env.REACT_APP_API_URL + '/management/classes';

        axios
            .post(API, form, {
                headers: header,
            })
            .then((res) => {
                const data = res.data;
                if (data.code == 200) {
                    setClass((classes) =>
                        classes.concat({
                            id: data.data,
                            name: form.name,
                            semester: form.semester,
                            enrollKey: form.enrollKey,
                            subjectId: form.subjectId,
                            semesterCode: form.semesterCode,
                        })
                    );
                    success(`Class ${form.name} created successfully`);
                    close();
                } else {
                    error(data.message);
                }
                setDisable(false);
            })
            .catch(() => {
                error(`An error occured!`);
                setDisable(false);
            });
    };

    return (
        <Overlay isOpen={showing} closeFn={setCreate}>
            <Container>
                <StyledHeader>
                    <StyledJumbotron>
                        <Title>CREATE NEW MEETING</Title>
                        <SubTitle>{form.name || 'Course name'}</SubTitle>
                    </StyledJumbotron>
                    <CloseIcon onClick={close} />
                </StyledHeader>
                <StyledBody>
                    <Row>
                        <Col>
                            <small>Date</small>
                            <StyledInput
                                type="date"
                                onChange={(e) => {
                                    handleChange(e, 'date');
                                }}
                                defaultValue={
                                    date &&
                                    new Date(date.setDate(date.getDate() + 1))
                                        .toISOString()
                                        .substr(0, 10)
                                }
                                readOnly={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Time</small>
                            <StyledInput
                                type="time"
                                onChange={(e) => {
                                    handleChange(e, 'time');
                                }}
                                defaultValue={date.toISOString().substr(0, 10)}
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

export default CreateClassForm;
