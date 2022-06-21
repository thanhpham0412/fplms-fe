/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';

import { error, success } from '../../utils/toaster';
import ButtonLoader from '../ButtonLoader';
// eslint-disable-next-line no-unused-vars
import { Container, CommentInput, Comment, Answers, Col, Row, Action } from './style';

import AttachmentIcon from '@mui/icons-material/Attachment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

const AnswerSection = ({ questionId, answers, setRefresh, student }) => {
    TimeAgo.addLocale(en);
    TimeAgo.addLocale(ru);
    const [answer, setAnswer] = useState();
    const [isLoading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false);
    const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/answers`;
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };
    const handleAnswer = (e) => {
        setLoading(true);
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
                success(`Post answer successfully!`);
                setAnswer('');
                setLoading(false);
                setRefresh((prev) => prev + 1);
            })
            .catch((err) => {
                error(`${err}`);
                setLoading(false);
            });
    };
    const showMore = (data) => {
        axios.delete(`${URL}/${data.id}`, { headers: header }).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                setRefresh((prev) => prev - 1);
                success(`Delete answer sucessfully!`);
            } else {
                error(`An error occured!`);
            }
        });
    };

    const handleLike = (data) => {
        console.log(data);
        if (!liked) {
            setLiked(true);
            axios
                .put(`${URL}/${data.id}/accept`, { headers: header })
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        success(`Like success`);
                    } else {
                        error(`Error occured`);
                    }
                })
                .catch((err) => {
                    error(`${err.message}`);
                });
        } else {
            setLiked(false);
        }
    };

    const editAnswer = () => {};

    return (
        <Container>
            <Answers>
                <img src={student?.picture} />
                <Comment isLoading={isLoading}>
                    <ButtonLoader isLoading={isLoading} />
                    <CommentInput
                        onChange={(e) => setAnswer(e.target.value)}
                        value={answer}
                        // placeholder="Writing your comment"
                    />
                    <AttachmentIcon />
                    <SendIcon onClick={handleAnswer} />
                </Comment>
            </Answers>

            {answers?.map((data, index) => (
                <Answers key={index}>
                    <Col>
                        <img src={data.student?.picture} />
                    </Col>
                    <Col>
                        <Row>
                            <Comment>
                                <CommentInput disabled defaultValue={data.content} />
                                <MoreHorizIcon onClick={() => showMore(data)} />
                            </Comment>
                        </Row>
                        <Row>
                            <Action onClick={() => handleLike(data)} liked={liked}>
                                Like
                            </Action>
                            <Action>
                                <ReactTimeAgo
                                    date={Date.parse(data.createdDate)}
                                    locale="en-US"
                                    onClick={editAnswer}
                                />
                            </Action>
                        </Row>
                    </Col>
                </Answers>
            ))}
        </Container>
    );
};

export default AnswerSection;
