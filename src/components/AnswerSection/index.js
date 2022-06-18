import { useEffect, useState } from 'react';

// import axios from 'axios';
// import { getTokenInfo } from '../../utils/account';
// import { success } from '../../utils/toaster';
import { Avatar, Container, CommentInput, Comment, Answers } from './style';

import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';

const AnswerSection = () => {
    const [answer, setAnswer] = useState();

    // const user = getTokenInfo();
    const [answers, setAnswers] = useState([
        {
            component: (
                <>
                    <Avatar />
                    <Comment>
                        <CommentInput disabled defaultValue="loremipsum" />
                    </Comment>
                </>
            ),
        },
    ]);
    const handleAnswer = () => {
        setAnswers((answers) =>
            answers.concat({
                component: (
                    <>
                        <Avatar />
                        <Comment>
                            <CommentInput disabled defaultValue={answer} />
                        </Comment>
                    </>
                ),
            })
        );
    };
    // const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/answers`;
    // // const user = getTokenInfo();
    // const header = {
    //     Authorization: `${localStorage.getItem('token')}`,
    // };
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // axios
    //     .post(
    //         URL,
    //         {
    //             content: answer,
    //             questionId: questionId,
    //             studentId: `adddafd5-db41-4ee8-b427-0e63e5504f07`,
    //         },
    //         { headers: header }
    //     )
    //     .then((res) => {
    //         console.log(res);
    //         setListen(true);
    //         success(`Post answer successfully!`);
    //     });

    return (
        <Container>
            <Answers>
                <Avatar />
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
                <Answers key={index}>{data.component}</Answers>
            ))}
        </Container>
    );
};

export default AnswerSection;
