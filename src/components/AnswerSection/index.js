import { Avatar, Container, CommentInput } from './style';

const AnswerSection = () => {
    return (
        <Container>
            <Avatar />
            <CommentInput placeholder="Writing your comment" />
            <Avatar />
            <CommentInput
                disabled
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
        </Container>
    );
};

export default AnswerSection;
