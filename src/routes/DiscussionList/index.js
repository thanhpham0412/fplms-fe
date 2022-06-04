import { useState } from 'react';

import Jumbotron from '../../components/Jumbotron';
import PostSection from '../../components/PostSection';
import Selection from '../../components/Selection';
import TopActivities from '../../components/TopActivities';
import {
    StyledContainer,
    StyledHeader,
    Row,
    Column,
    NewTopicBtn,
    Label,
    InputBox,
    StyledBody,
    PostList,
} from './style';

import AddIcon from '@mui/icons-material/Add';

const DiscussionList = () => {
    const arr = ['SWP391', 'C#', 'MogoDB'];
    const [search, setSearch] = useState('');
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
                <Jumbotron title={'discussion'} subtitle={'se1633'} />
                <StyledHeader>
                    <Row style={{ alignItems: 'flex-end' }}>
                        <Column>
                            <Row>
                                <Column>
                                    <Label>Search for topics</Label>
                                    <InputBox
                                        type={'text'}
                                        value={search}
                                        placeholder={'Search topic by name'}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </Column>
                                <Column>
                                    <Label>Type</Label>
                                    <Selection arr={arr} label={'All'} />
                                </Column>
                            </Row>
                        </Column>
                        <Column>
                            <NewTopicBtn>
                                <AddIcon />
                                Start new topic
                            </NewTopicBtn>
                        </Column>
                    </Row>
                </StyledHeader>
                <StyledBody>
                    <Column>
                        <PostList>
                            Newest Post
                            <PostSection />
                            <PostSection />
                            <PostSection />
                        </PostList>
                    </Column>
                    <Column>
                        <TopActivities arr={topMember} />
                    </Column>
                </StyledBody>
            </StyledContainer>
        </>
    );
};

export default DiscussionList;
