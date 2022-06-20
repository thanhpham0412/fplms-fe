import { useEffect, useState } from 'react';

import axios from 'axios';

import { getTokenInfo } from '../../utils/account';
import { error, success } from '../../utils/toaster';
// import axios from 'axios';
// import { getTokenInfo } from '../../utils/account';
// import { success } from '../../utils/toaster';
import { Container, CommentInput, Comment, Answers } from './style';

import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';

const AnswerSection = ({ questionId, answers, setRefresh, student }) => {
    const [answer, setAnswer] = useState();

    const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/answers`;
    const user = getTokenInfo();
    console.log(user);
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };
    const handleAnswer = () => {
        axios
            .post(
                URL,
                {
                    content: answer,
                    questionId: questionId,
                },
                { headers: header }
            )
            .then(() => {
                setRefresh((prev) => prev + 1);
                success(`Post answer successfully!`);
            })
            .catch((err) => {
                error(`${err}`);
            });
    };
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Answers>
                <img src={student?.picture} />
                <Comment>
                    <CommentInput
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Writing your comment"
                    />
                    <AttachmentIcon />
                    <SendIcon onClick={handleAnswer} />
                </Comment>
            </Answers>

            {answers?.map((data, index) => (
                <Answers key={index}>
                    <img src={data.student.picture} />
                    <Comment>
                        <CommentInput disabled defaultValue={data.content} />
                    </Comment>
                </Answers>
            ))}
        </Container>
    );
};

export default AnswerSection;
