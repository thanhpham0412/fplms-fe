import { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Jumbotron, TopActivities } from '../../components';
import AnswerSection from '../../components/AnswerSection';
import { error, success } from '../../utils/toaster';
import {
    StyledContainer,
    StyledHeader,
    Avatar,
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
    const [post, setPost] = useState();

    const id = useParams();
    const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/questions/${id}/answers`;
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
                            setPost(res.data);
                            console.log(res);
                            success(`Fetch success`);
                        } else {
                            error(`An error occured!`);
                        }
                    });
            };
            fetchData();
        } catch (err) {
            error(err);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <StyledContainer>
                <Jumbotron title={'discussion'} subtitle={'What does the fox say?'} />

                <StyledHeader>
                    <Avatar />
                    <Column>
                        <Title>{post.title}</Title>
                        <Subtitle>{post.createdDate}</Subtitle>
                    </Column>
                </StyledHeader>
                <StyledBody>
                    <Column>
                        <PostView>
                            <PostMain>
                                <PostTitle>{post.title}</PostTitle>
                                <PostText>{post.content}</PostText>
                                <Divider />
                            </PostMain>
                            <AnswerSection />
                        </PostView>
                    </Column>
                    <Column>
                        <TopActivities arr={topMember} />
                    </Column>
                </StyledBody>
            </StyledContainer>
        </>
    );
};

export default DiscussionView;
