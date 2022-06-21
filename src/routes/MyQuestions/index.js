import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Pagination } from '../../components';
import Jumbotron from '../../components/Jumbotron';
import PostSection from '../../components/PostSection';
import PostLoader from '../../components/PostSection/loader';
import Selection from '../../components/Selection';
import TopActivities from '../../components/TopActivities';
import { getTokenInfo } from '../../utils/account';
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
    PaginateContainer,
} from './style';

import AddIcon from '@mui/icons-material/Add';

const MyQuestions = () => {
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
    const [pageSize] = useState(10);
    // eslint-disable-next-line no-unused-vars
    const [totalPosts, setTotalPosts] = useState();
    const navigate = useNavigate();
    const user = getTokenInfo();
    console.log(user);
    let URL = process.env.REACT_APP_DISCUSSION_URL;
    if (user.role == 'Student') {
        URL = URL + '/discussion/students/questions';
    } else {
        URL = URL + '/discussion/lecturers/questions';
    }

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
                        if (res.status >= 200 && res.status < 300) {
                            setPost(res.data);
                            console.log(res);
                            // setTotalPosts(JSON.parse(res.headers['x-pagination']).TotalCount);
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
                            <NewTopicBtn onClick={() => navigate('/add-question')}>
                                <AddIcon />
                                Start new topic
                            </NewTopicBtn>
                        </Column>
                    </Row>
                </StyledHeader>
                <StyledBody>
                    <Column>
                        <PostList>
                            {isLoading ? (
                                loadAnim
                            ) : (
                                <>
                                    <span>My posts</span>
                                    {posts
                                        ?.filter((post) => !post.removed)
                                        .map((post) => (
                                            <PostSection key={post.id} post={post} />
                                        ))}
                                    <span>Removed posts</span>
                                    {posts
                                        ?.filter((post) => post.removed)
                                        .map((post) => (
                                            <PostSection key={post.id} post={post} />
                                        ))}
                                </>
                            )}
                        </PostList>
                        <PaginateContainer>
                            <Pagination
                                pageSize={pageSize}
                                totalPosts={10}
                                setPageNum={setPageNum}
                            />
                        </PaginateContainer>
                    </Column>
                    <Column>
                        <span>Top Activities</span>
                        <TopActivities arr={topMember} />
                    </Column>
                </StyledBody>
            </StyledContainer>
        </>
    );
};

export default MyQuestions;
