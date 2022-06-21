import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Pagination } from '../../components';
import Jumbotron from '../../components/Jumbotron';
import PostSection from '../../components/PostSection';
import PostLoader from '../../components/PostSection/loader';
import Selection from '../../components/Selection';
import TopActivities from '../../components/TopActivities';
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
    const [posts, setPosts] = useState();
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(3);
    const navigate = useNavigate();

    const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/questions`;

    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        try {
            setLoading(true);
            const fetchData = async () => {
                axios
                    .get(URL, {
                        headers: header,
                        params: {
                            PageNumber: pageNum,
                            PageSize: pageSize,
                        },
                    })
                    .then((res) => {
                        if (res.status == 200) {
                            setPosts(res.data);
                            setTotalPages(JSON.parse(res.headers['x-pagination']).TotalPages);
                            success(`Load post success`);
                            setLoading(false);
                        } else {
                            error(`An error occured!`);
                            setLoading(false);
                        }
                    });
            };
            fetchData();
        } catch (err) {
            error(`${err}`);
            setLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum]);

    const searchForQuestions = (e) => {
        if (e.key === 'Enter') {
            setLoading(true);
            axios
                .get(URL, {
                    headers: header,
                    params: { PageNumber: pageNum, PageSize: pageSize, Question: search },
                })
                .then((res) => {
                    if (res.status == 200) {
                        setPosts(res.data);
                        setTotalPages(JSON.parse(res.headers['x-pagination']).TotalPages);
                        success(`Load post success`);
                        setLoading(false);
                    } else {
                        error(`An error occured!`);
                        setLoading(false);
                    }
                });
        }
    };

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
                                        onKeyUp={searchForQuestions}
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
                                <span>Add question</span>
                            </NewTopicBtn>
                        </Column>
                    </Row>
                </StyledHeader>
                <StyledBody>
                    <Column>
                        <span>New Posts</span>
                        <PostList>
                            {isLoading
                                ? loadAnim
                                : posts?.map((post) => (
                                      <PostSection key={post.id} post={post} setPosts />
                                  ))}
                        </PostList>
                        {totalPages > 0 && (
                            <PaginateContainer>
                                <Pagination
                                    pageSize={pageSize}
                                    totalPages={totalPages}
                                    setPageNum={setPageNum}
                                    currentPage={pageNum}
                                />
                            </PaginateContainer>
                        )}
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

export default DiscussionList;
