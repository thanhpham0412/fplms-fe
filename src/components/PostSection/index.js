import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import { error, success } from '../../utils/toaster';
import {
    Container,
    Row,
    Title,
    Course,
    PostFeature,
    Divider,
    Author,
    Answers,
    FeatureList,
    Vote,
} from './style';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

const PostSection = ({ post, setPosts }) => {
    TimeAgo.addLocale(en);
    TimeAgo.addLocale(ru);
    const navigate = useNavigate();
    const { title, student, subject, createdDate, removed, removedBy } = post;

    const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/questions/${post.id}`;
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };
    const deleteQuestion = () => {
        axios.delete(URL, { headers: header }).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                success(`Delete success`);
                setPosts((prev) =>
                    prev.filter((item) => {
                        if (item.id !== post.id) return item;
                    })
                );
            } else {
                error(`${res.message}`);
            }
        });
    };

    const handleVote = () => {
        const handleUpvote = () => {
            setPosts((prev) =>
                prev.map((item) =>
                    item.id === post.id
                        ? {
                              ...item,
                              upvotes: post.upvoted ? post.upvotes - 1 : post.upvotes + 1,
                              upvoted: post.upvoted ? false : true,
                          }
                        : item
                )
            );
        };
        axios
            .patch(
                URL + `/upvote`,
                {
                    upvotes: post.upvotes + 1,
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
        <Row>
            <Container>
                <Row>
                    <Title
                        onClick={() => {
                            navigate(`/discussion-view/${post.id}`);
                        }}
                    >
                        {title}
                    </Title>
                    <Course>{subject?.name}</Course>
                </Row>
                <Row>
                    <FeatureList>
                        <PostFeature>SWP391</PostFeature>
                        <PostFeature>.Net</PostFeature>
                        <PostFeature>C#</PostFeature>
                        <PostFeature>MongoDB</PostFeature>
                    </FeatureList>
                </Row>
                <Divider />
                <Row>
                    <Author>
                        <img src={student?.picture} alt="Student Avatar" />
                        <p>
                            Posted by <span>{student?.email} </span>
                            <ReactTimeAgo date={Date.parse(createdDate)} locale="en-US" />
                        </p>
                    </Author>

                    {!removed && <Answers onClick={deleteQuestion}>Remove</Answers>}
                </Row>
                {removed && <Answers>Removed by {removedBy}</Answers>}
            </Container>
            <Vote upvoted={post.upvoted}>
                <ArrowDropUpIcon onClick={() => handleVote()} />
                <div>{post.upvotes}</div>
            </Vote>
        </Row>
    );
};

export default PostSection;
