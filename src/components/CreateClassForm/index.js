import { useState } from 'react';

import InputNumber from '../InputNumber';
import Overlay from '../Overlay';
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

const CreateClassForm = ({ showing, setCreate }) => {
    const [form, setForm] = useState({
        className: '',
        key: '',
        code: '',
        timeout: '',
        noGroups: 0,
        minMembers: 0,
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
        console.log(form);
    };

    return (
        <Overlay showing={showing} setOpen={setCreate}>
            <Container onClick={(e) => e.stopPropagation()}>
                <StyledHeader>
                    <StyledJumbotron>
                        <Title>CREATE NEW CLASS</Title>
                        <SubTitle>Name</SubTitle>
                    </StyledJumbotron>
                    <CloseIcon onClick={close} />
                </StyledHeader>
                <StyledBody>
                    <Row>
                        <Col>
                            <small>Classname</small>
                            <StyledInput
                                onChange={(e) => {
                                    handleChange(e, 'className');
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
                                    handleChange(e, 'key');
                                }}
                            />
                        </Col>
                        <Col>
                            <small>Subject code</small>
                            <StyledInput
                                onChange={(e) => {
                                    handleChange(e, 'code');
                                }}
                            />
                        </Col>
                        <Col>
                            <small>Close Time</small>
                            <StyledInput
                                onChange={(e) => {
                                    handleChange(e, 'timeout');
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Number of groups</small>
                            <InputNumber />
                        </Col>
                        <Col>
                            <small>Min number of members</small>
                            <StyledInput
                                onChange={(e) => {
                                    handleChange(e, 'minMembers', parseInt);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledButton onClick={submit}>CREATE CLASS</StyledButton>
                        </Col>
                    </Row>
                </StyledBody>
            </Container>
        </Overlay>
    );
};

export default CreateClassForm;
