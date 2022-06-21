import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import { getTokenInfo } from '../../utils/account';
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
} from './style';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

const PostSection = ({ post, setPosts }) => {
    TimeAgo.addLocale(en);
    TimeAgo.addLocale(ru);
    const navigate = useNavigate();
    const { title, student, subject, createdDate } = post;

    const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/questions/${post.id}`;
    const user = getTokenInfo();
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };
    const deleteQuestion = () => {
        axios.delete(URL, { headers: header }).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                success(`Delete success`);
                setPosts((prev) => prev.filter((item) => item.id !== post.id));
            } else {
                error(`${res.message}`);
            }
        });
    };
    return (
        <>
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
                    {user.role == 'Student' ? (
                        <Answers onClick={deleteQuestion}>Remove</Answers>
                    ) : (
                        <Answers onClick={deleteQuestion}>Remove</Answers>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default PostSection;
