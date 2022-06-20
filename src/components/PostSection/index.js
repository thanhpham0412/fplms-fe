// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import axios from 'axios';
import { convertFromRaw, convertToRaw } from 'draft-js';
import TimeAgo from 'javascript-time-ago';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import { success } from '../../utils/toaster';
import {
    Container,
    Row,
    Title,
    Course,
    PostContent,
    PostFeature,
    Divider,
    Author,
    Answers, // AuthorAva,
    FeatureList,
} from './style';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

const PostSection = ({ post }) => {
    TimeAgo.addLocale(en);
    TimeAgo.addLocale(ru);
    const navigate = useNavigate();
    const { title, content, student, subject, createdDate } = post;
    const test = convertFromRaw(JSON.parse(content));
    const blocks = convertToRaw(test).blocks;
    // eslint-disable-next-line no-unused-vars
    const value = blocks.map((block) => (!block.text.trim() && '\n') || block.text).join('\n');
    console.log(test);

    const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/questions/${post.id}`;
    // const user = getTokenInfo();
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };
    const deleteQuestion = () => {
        axios.delete(URL, { headers: header }).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                success(`Delete success`);
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
                    <Course>{subject.name}</Course>
                </Row>
                <Row>
                    <PostContent>{content}</PostContent>
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
                        {/* <AccountCircleOutlinedIcon /> */}
                        <img src={student.picture} alt="Student Avatar" />
                        <p>
                            Posted by <span>{student.email} </span>
                            <ReactTimeAgo date={Date.parse(createdDate)} locale="en-US" />
                        </p>
                    </Author>
                    <Answers onClick={deleteQuestion}>10+ answers</Answers>
                </Row>
            </Container>
        </>
    );
};

export default PostSection;
