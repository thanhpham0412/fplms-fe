/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import axios from 'axios';

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
    Textarea,
} from './style';

import CloseIcon from '@mui/icons-material/Close';

const CreateTopicForm = ({ showing, item, setOpen, save, disable, subject }) => {
    const [form, setForm] = useState({
        actor: '',
        context: '',
        name: '',
        problem: '',
        requirement: '',
        subjectId: '',
        theme: '',
    });

    useEffect(() => {
        setForm({
            ...form,
            name: item?.title || '',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item?.id]);

    const submit = () => {
        save(item?.id, form);
    };
    const close = () => {
        setOpen(false);
    };

    const changeHandler = (field, e) => {
        setForm({
            ...form,
            [field]: e.target.value,
        });
    };

    return (
        <Overlay isOpen={showing}>
            <Container>
                <StyledHeader>
                    <StyledJumbotron>
                        <Title>TOPIC UPDATE #{subject}</Title>
                        <SubTitle>{form.name || 'Untitled'}</SubTitle>
                    </StyledJumbotron>
                    <CloseIcon onClick={close} />
                </StyledHeader>
                <StyledBody>
                    <Row>
                        <Col>
                            <DataHeader>
                                <small>Topic name</small>
                                <Error></Error>
                            </DataHeader>
                            <StyledInput
                                placeholder="Topic name"
                                value={form.name}
                                onChange={(e) => changeHandler('name', e)}
                            />
                        </Col>
                        <Col>
                            <DataHeader>
                                <small>Context</small>
                                <Error></Error>
                            </DataHeader>
                            <StyledInput placeholder="Context" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DataHeader>
                                <small>Requirement</small>
                                <Error></Error>
                            </DataHeader>
                            <Textarea
                                maxRows={14}
                                minRows={7}
                                aria-label="maximum height"
                                placeholder="Project Requirement"
                                defaultValue={item?.content}
                                style={{ width: '100%' }}
                                onChange={(e) => changeHandler('requirement', e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledButton onClick={submit} disable={disable}>
                                {disable ? (
                                    <Spinner radius="32px" color={COLOR.primary02} />
                                ) : (
                                    'SAVE TOPIC'
                                )}
                            </StyledButton>
                        </Col>
                    </Row>
                </StyledBody>
            </Container>
        </Overlay>
    );
};

export default CreateTopicForm;
