import { Container, Avatar, Content, Title, Subtitle } from './style';

const Jumbotron = ({ title, subtitle }) => {
    return (
        <Container>
            <Avatar />
            <Content>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </Content>
        </Container>
    );
};

export default Jumbotron;
