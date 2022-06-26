/* eslint-disable no-unused-vars */
import { useState } from 'react';

import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';

import { error, success } from '../../utils/toaster';
import ButtonLoader from '../ButtonLoader';
import { Container, CommentInput, Comment, Answers, Col, Row, Action, Vote } from './style';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

const AnswerSection = ({ questionId, answers, setRefresh, student, setQuestion }) => {
    TimeAgo.addLocale(en);
    TimeAgo.addLocale(ru);
    const [answer, setAnswer] = useState();
    const [isLoading, setLoading] = useState(false);
    const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/answers`;
    const date = new Date();
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };
    console.log(answers);
    const handleAnswer = () => {
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
                setQuestion((prev) => {
                    return {
                        ...prev,
                        answers: prev.answers.concat({
                            id: Math.floor(Math.random() * 1000),
                            content: answer,
                            createdDate: date,
                            accepted: false,
                            upvotes: 0,
                            upvoted: false,
                            student: null,
                        }),
                    };
                });
                // setRefresh((prev) => prev + 1);
                setAnswer('');
                setLoading(false);
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

    const handleLike = (data, e) => {
        e.preventDefault();
        console.log(data.id);
        axios
            .put(`${URL}/${data.id}/accept`, {}, { headers: header })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    e.target.checked = true;
                    success(`Like success`);
                } else {
                    error(`Error occured`);
                }
            })
            .catch((err) => {
                error(`${err.message}`);
            });
    };

    const editAnswer = (id) => {
        axios
            .put(
                URL + `/${id}`,
                {
                    content: 'HALO WORLD',
                },
                { headers: header }
            )
            .then((res) => {
                if (res.status == 204) {
                    success(`Update answer successfully!`);
                } else {
                    error(`An error occured`);
                }
            })
            .catch((err) => {
                error(err);
            });
    };

    const handleVote = (data) => {
        const handleUpvote = () => {
            setQuestion((prev) => {
                return {
                    ...prev,
                    answers: prev.answers.map((answer) =>
                        answer.id === data.id
                            ? {
                                  ...answer,
                                  upvotes: data.upvoted ? data.upvotes - 1 : data.upvotes + 1,
                                  upvoted: data.upvoted ? false : true,
                              }
                            : answer
                    ),
                };
            });
        };
        axios
            .patch(
                URL + `/${data.id}/upvote`,
                {
                    upvotes: data.upvoted + 1,
                },
                { headers: header }
            )
            .then((res) => {
                if (res.status == 204) {
                    handleUpvote();
                    success(`Update upvote successfully!`);
                }
            });
    };

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

            {answers
                ?.sort((a, b) => b.upvotes - a.upvotes)
                .sort((a) => (a.accepted ? -1 : 1))
                .map((data) => (
                    <Answers key={data.id}>
                        <Col>
                            <img src={data.student?.picture} alt="Student Avatar" />
                        </Col>
                        <Col>
                            <Row>
                                <Comment>
                                    <CommentInput disabled defaultValue={data.content} />
                                    <MoreHorizIcon onClick={() => showMore(data)} />
                                </Comment>
                            </Row>
                            <Row>
                                <Action>
                                    <input
                                        type={'radio'}
                                        name="Like"
                                        id={data.id}
                                        onClick={(e) => handleLike(data, e)}
                                        defaultChecked={data.accepted ? true : false}
                                    />
                                    <label htmlFor={data.id}>
                                        <DoneIcon />
                                    </label>
                                </Action>

                                <Action>
                                    <ReactTimeAgo
                                        date={Date.parse(data.createdDate)}
                                        locale="en-US"
                                        onClick={() => editAnswer(data.id)}
                                    />
                                </Action>
                            </Row>
                        </Col>
                        <Vote upvoted={data.upvoted}>
                            <ArrowDropUpIcon onClick={() => handleVote(data)} />
                            <div>{data.upvotes}</div>
                        </Vote>
                    </Answers>
                ))}
        </Container>
    );
};

export default AnswerSection;
