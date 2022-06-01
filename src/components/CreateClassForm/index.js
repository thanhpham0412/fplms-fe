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
    const close = () => {
        setCreate(false);
    };

    return (
        <Container showing={showing}>
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
                        <StyledInput />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <small>Enroll Key</small>
                        <StyledInput type="password" />
                    </Col>
                    <Col>
                        <small>Subject code</small>
                        <StyledInput />
                    </Col>
                    <Col>
                        <small>Close Time</small>
                        <StyledInput />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <small>Number of groups</small>
                        <StyledInput />
                    </Col>
                    <Col>
                        <small>Min number of members</small>
                        <StyledInput />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <StyledButton>CREATE CLASS</StyledButton>
                    </Col>
                </Row>
            </StyledBody>
        </Container>
    );
};

export default CreateClassForm;
