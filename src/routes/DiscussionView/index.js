import { Jumbotron, TopActivities } from '../../components';
import AnswerSection from '../../components/AnswerSection';
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
    return (
        <>
            <StyledContainer>
                <Jumbotron title={'discussion'} subtitle={'What does the fox say?'} />

                <StyledHeader>
                    <Avatar />
                    <Column>
                        <Title>phuongmtse161187</Title>
                        <Subtitle>Posted on May 22</Subtitle>
                    </Column>
                </StyledHeader>
                <StyledBody>
                    <Column>
                        <PostView>
                            <PostMain>
                                <PostTitle>What does the fox say?</PostTitle>
                                <PostText>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut. Aliquip ex ea commodo consequat. Duis aute irure dolor
                                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla pariatur. Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                </PostText>
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
