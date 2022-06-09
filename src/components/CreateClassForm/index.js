import { useState } from 'react';

import axios from 'axios';

import { error } from '../../utils/toaster';
import Overlay from '../Overlay';
import Selection from '../Selection';
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
} from './style';

import CloseIcon from '@mui/icons-material/Close';

const CreateClassForm = ({ showing, setCreate, setClass }) => {
    const [form, setForm] = useState({
        name: '',
        enrollKey: '',
        subjectId: 1,
        id: 1,
        timeout: '',
        semester: 'SPRING',
    });

    const close = () => {
        setCreate(false);
    };

    const handleChange = (e, field, parser = String) => {
        setForm({
            ...form,
            [field]: parser(e.target.value),
        });
    };

    const submit = () => {
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
                            name: form.name,
                            semester: form.semester,
                        })
                    );
                    close();
                } else {
                    error(data.message);
                }
            });
    };

    const handleSelection = (val) => {
        setForm({
            ...form,
            subjectId: val.value,
        });
    };

    const [subjects] = useState([
        {
            value: 1,
            content: 'OSG202',
        },
        {
            value: 2,
            content: 'PRN211',
        },
        {
            value: 3,
            content: 'SWP391',
        },
        {
            value: 4,
            content: 'SWR302',
        },
        {
            value: 5,
            content: 'SWT301',
        },
        {
            value: 6,
            content: 'PRJ301',
        },
        {
            value: 7,
            content: 'DBI202',
        },
    ]);

    const [semester] = useState([
        {
            value: 1,
            content: 'Spring',
        },
        {
            value: 2,
            content: 'Summer',
        },
        {
            value: 3,
            content: 'Fall',
        },
        {
            value: 4,
            content: 'Winter',
        },
    ]);

    return (
        <Overlay showing={showing} setOpen={setCreate}>
            <Container>
                <StyledHeader>
                    <StyledJumbotron>
                        <Title>CREATE NEW CLASS</Title>
                        <SubTitle>{form.name || 'Course name'}</SubTitle>
                    </StyledJumbotron>
                    <CloseIcon onClick={close} />
                </StyledHeader>
                <StyledBody>
                    <Row>
                        <Col>
                            <small>Classname</small>
                            <StyledInput
                                placeholder="Software Development"
                                onChange={(e) => {
                                    handleChange(e, 'name');
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Enroll Key</small>
                            <StyledInput
                                type="password"
                                onChange={(e) => {
                                    handleChange(e, 'enrollKey');
                                }}
                            />
                        </Col>
                        <Col>
                            <small>Close Time</small>
                            <StyledInput
                                placeholder={`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}
                                onChange={(e) => {
                                    handleChange(e, 'timeout');
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Subject Code</small>
                            <Selection
                                options={subjects}
                                placeholder="Subject Code"
                                onChange={handleSelection}
                            />
                        </Col>
                        <Col>
                            <small>Semester</small>
                            <Selection
                                options={semester}
                                placeholder="Semester"
                                onChange={handleSelection}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledButton onClick={submit}>Create Class</StyledButton>
                        </Col>
                    </Row>
                </StyledBody>
            </Container>
        </Overlay>
    );
};

export default CreateClassForm;
