import { useEffect, useState } from 'react';

import axios from 'axios';
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
    PostText,
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
    const [isLoading, setLoading] = useState();
    const [refresh, setRefresh] = useState(0);

    const questionId = useParams().id;
    const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/questions/${questionId}`;
    // const user = getTokenInfo();
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };
    useEffect(() => {
        try {
            const fetchData = () => {
                axios
                    .get(URL, {
                        headers: header,
                    })
                    .then((res) => {
                        if (res.status == 200) {
                            setQuestion(res.data);
                            console.log(res);
                            setLoading(false);
                        } else {
                            error(`An error occured!`);
                            setLoading(false);
                        }
                    });
            };
            fetchData();
        } catch (err) {
            error(err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);
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
                                <Subtitle>{question?.createdDate}</Subtitle>
                            </Column>
                        </StyledHeader>
                        <StyledBody>
                            <Column>
                                <PostView>
                                    <PostMain>
                                        <PostTitle>{question?.title}</PostTitle>
                                        <PostText>{question?.content}</PostText>
                                        <Divider />
                                    </PostMain>
                                    <AnswerSection
                                        questionId={questionId}
                                        answers={question?.answers}
                                        refresh={refresh}
                                        student={question?.student}
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
