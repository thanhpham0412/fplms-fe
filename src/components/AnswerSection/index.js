import { Avatar, Container, CommentInput, Comment } from './style';

import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';

const AnswerSection = () => {
    return (
        <Container>
            <Avatar />
            <Comment>
                <CommentInput placeholder="Writing your comment" />
                <AttachmentIcon />
                <SendIcon />
            </Comment>
            <Avatar />
            <Comment>
                <CommentInput
                    disabled
                    defaultValue="Lorem ipsum dolor sit amet, dolore magna aliqua. sit amet, Lorem ipsum dolor sit amet, dolore magna aliqua. sit amet, Lorem ipsum dolor sit amet, dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Comment>
            <Avatar />
            <Comment>
                <CommentInput
                    disabled
                    defaultValue="Lorem ipsum dolor sit amet, dolore magna aliqua. sit amet, Lorem ipsum dolor sit amet, dolore magna aliqua. sit amet, Lorem ipsum dolor sit amet, dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Comment>
            <Avatar />
            <Comment>
                <CommentInput
                    disabled
                    defaultValue="Lorem ipsum dolor sit amet, dolore magna aliqua. sit amet, Lorem ipsum dolor sit amet, dolore magna aliqua. sit amet, Lorem ipsum dolor sit amet, dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Comment>
        </Container>
    );
};

export default AnswerSection;
