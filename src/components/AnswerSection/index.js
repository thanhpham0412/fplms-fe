import { Avatar, Container, CommentInput, Row, Comment } from './style';

import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';

const AnswerSection = () => {
    return (
        <Container>
            <Row>
                <Avatar />
                <Comment>
                    <CommentInput placeholder="Writing your comment" />
                    <span>
                        <AttachmentIcon />
                        <SendIcon />
                    </span>
                </Comment>
            </Row>
            <Row>
                <Avatar />
                <Comment>
                    <CommentInput
                        disabled
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    />
                </Comment>
            </Row>
        </Container>
    );
};

export default AnswerSection;
