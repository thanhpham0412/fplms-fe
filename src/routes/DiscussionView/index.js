/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import axios from 'axios';
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useParams } from 'react-router-dom';

import { Jumbotron, TopActivities } from '../../components';
import AnswerSection from '../../components/AnswerSection';
import PostLoader from '../../components/PostSection/loader';
import { error } from '../../utils/toaster';
import {
    StyledContainer,
    StyledHeader,
    Title,
    Subtitle,
    Column,
    StyledBody,
    PostView,
    PostMain,
    PostTitle,
    Divider,
} from './style';

const DiscussionView = () => {
    const topMember = [
        {
            name: 'Tran Nhat Hoang',
            comments: '1k comments',
        },
        {
            name: 'Quach Heng To Ni',
            comments: '305 comments',
        },
        {
            name: 'Mai Thanh Phuong',
            comments: '300 comments',
        },
        {
            name: 'Pham Trong Thanh',
            comments: '290 comments',
        },
        {
            name: 'Nguyen Thanh Kien',
            comments: '102 comments',
        },
    ];
    const [question, setQuestion] = useState();
    const [isLoading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);
    let editorState;
    let raw;
    const questionId = useParams().id;

    if (question && question.content) {
        raw = convertFromRaw(JSON.parse(question.content));
        editorState = EditorState.createWithContent(raw);
    }
    useEffect(() => {
        const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/questions/${questionId}`;
        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };
        const fetchData = () => {
            axios
                .get(URL, {
                    headers: header,
                })
                .then((res) => {
                    if (res.status == 200) {
                        setQuestion(res.data);
                        setLoading(false);
                    } else {
                        error(`An error occured!`);
                        setLoading(false);
                    }
                })
                .catch((err) => error(err));
        };
        fetchData();
    }, [questionId, refresh]);
    return (
        <>
            <StyledContainer>
                <Jumbotron title={'discussion'} subtitle={'What does the fox say?'} />

                {isLoading ? (
                    <PostLoader />
                ) : (
                    <>
                        <StyledHeader>
                            <img src={question?.student.picture} alt="Student Avatar" />
                            <Column>
                                <Title>{question?.student.email}</Title>
                                <Subtitle>{question.createdDate}</Subtitle>
                            </Column>
                        </StyledHeader>
                        <StyledBody>
                            <Column>
                                <PostView>
                                    <PostMain>
                                        <PostTitle>{question.title}</PostTitle>
                                        <Editor
                                            readOnly={true}
                                            editorState={editorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                        />
                                        <Divider />
                                    </PostMain>
                                    <AnswerSection
                                        questionId={questionId}
                                        setQuestion={setQuestion}
                                        answers={question.answers}
                                        student={question.student}
                                        setRefresh={setRefresh}
                                    />
                                </PostView>
                            </Column>
                            <Column>
                                <TopActivities arr={topMember} />
                            </Column>
                        </StyledBody>
                    </>
                )}
            </StyledContainer>
        </>
    );
};

export default DiscussionView;
