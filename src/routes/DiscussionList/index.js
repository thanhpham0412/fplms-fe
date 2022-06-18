import { useEffect, useState } from 'react';

import axios from 'axios';

import { Pagination } from '../../components';
import Jumbotron from '../../components/Jumbotron';
import PostSection from '../../components/PostSection';
import PostLoader from '../../components/PostSection/loader';
import Selection from '../../components/Selection';
import TopActivities from '../../components/TopActivities';
// import { getTokenInfo } from '../../utils/account';
import { error, success } from '../../utils/toaster';
import {
    StyledContainer,
    StyledHeader,
    Row,
    Column,
    NewTopicBtn,
    InputBox,
    StyledBody,
    PostList,
    Label,
    TypeSelection,
} from './style';

import AddIcon from '@mui/icons-material/Add';

const DiscussionList = () => {
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

    const options = [
        {
            content: 'SWP391',
            value: 'SWP391',
        },
        {
            content: 'C#',
            value: 'C#',
        },
        {
            content: 'MogoDB',
            value: 'MogoDB',
        },
    ];
    const [loadAnim] = useState(
        new Array(3).fill(PostLoader).map((Load, i) => <PostLoader key={i} />)
    );
    const [isLoading, setLoading] = useState(true);
    const [posts, setPost] = useState();
    const [pageNum, setPageNum] = useState(1);
    const [pageSize] = useState(5);

    const URL =
        process.env.REACT_APP_DISCUSSION_URL + `/discussion/questions?PageNumber=1&PageSize=1`;
    // const user = getTokenInfo();
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        try {
            const fetchData = async () => {
                axios
                    .get(URL, {
                        headers: header,
                        params: { PageNumber: pageNum, PageSize: pageSize },
                    })
                    .then((res) => {
                        if (res.status == 200) {
                            setPost(res.data);
                            console.log(res);
                            success(`Fetch success`);
                            setLoading(false);
                        } else {
                            setLoading(false);
                        }
                    });
            };
            fetchData();
        } catch (err) {
            error(err);
            setLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum]);
    const addNewPost = () => {
        axios
            .post(
                'https://843f-171-235-33-106.ngrok.io/api/discussion/questions',
                {
                    title: 'What should we do 2?',
                    content:
                        'We should bla bla bla blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    subjectName: 'SWP391',
                },
                { headers: header }
            )
            .catch((err) => error(err));
    };
    // const fetchMorePosts = async () => {
    //     const res = await axios.get(URL, {
    //         headers: header,
    //         params: { PageNumber: pageNum, PageSize: pageSize },
    //     });
    // };

    return (
        <>
            <StyledContainer>
                <Jumbotron title={'discussion'} subtitle={'SWP391'} />
                <StyledHeader>
                    <Row style={{ alignItems: 'flex-end' }}>
                        <Column>
                            <Row style={{ alignItems: 'flex-end' }}>
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
                                    <TypeSelection>
                                        <Selection
                                            title={'Type'}
                                            options={options}
                                            placeholder={'All'}
                                        />
                                    </TypeSelection>
                                </Column>
                            </Row>
                        </Column>
                        <Column>
                            <NewTopicBtn onClick={addNewPost}>
                                <AddIcon />
                                Start new topic
                            </NewTopicBtn>
                        </Column>
                    </Row>
                </StyledHeader>
                <StyledBody>
                    <Column>
                        <PostList>
                            <span>New posts</span>
                            {isLoading
                                ? loadAnim
                                : posts?.map((post) => <PostSection key={post.id} post={post} />)}
                        </PostList>
                        <Pagination pageSize={pageSize} totalPosts={10} setPageNum={setPageNum} />
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
