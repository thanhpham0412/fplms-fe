import { useState } from 'react';

import axios from 'axios';

import { error, success } from '../../utils/toaster';
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
    DataHeader,
    Error,
} from './style';

import CloseIcon from '@mui/icons-material/Close';

const CreateClassForm = ({ showing, setCreate, setClass, subjects }) => {
    const [form, setForm] = useState({
        name: '',
        enrollKey: '',
        subjectId: 1,
        id: 1,
        timeout: '',
        semester: 'SPRING',
    });

    const [validError, setError] = useState({
        name: '',
        enrollKey: '',
    });

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
        let errors = 0;

        if (form.enrollKey.trim().length < 3) {
            setError((err) => ({ ...err, enrollKey: 'Enroll Key length must be longer than 3!' }));
            errors++;
        }

        if (form.name.trim().length < 5) {
            setError((err) => ({ ...err, name: 'Class Name length must be longer than 5!' }));
            errors++;
        }

        if (errors > 0) return;

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
                            name: form.name,
                            semester: form.semester,
                        })
                    );
                    setDisable(false);
                    success(`Class ${form.name} created successfully`);
                    close();
                } else {
                    error(data.message);
                }
            })
            .catch(() => {
                error(`An error occured!`);
                setDisable(false);
            });
    };

    const handleSelection = (val) => {
        setForm({
            ...form,
            subjectId: val.value,
        });
    };

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
                            <DataHeader>
                                <small>Classname</small>
                                <Error>{validError.name}</Error>
                            </DataHeader>
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
                            <DataHeader>
                                <small>Enroll Key</small>
                                <Error>{validError.enrollKey}</Error>
                            </DataHeader>
                            <StyledInput
                                type="password"
                                onChange={(e) => {
                                    handleChange(e, 'enrollKey');
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
                            <StyledButton onClick={submit} disable={disable}>
                                Create Class
                            </StyledButton>
                        </Col>
                    </Row>
                </StyledBody>
            </Container>
        </Overlay>
    );
};

export default CreateClassForm;
