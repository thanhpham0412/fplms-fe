// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TimeAgo from 'javascript-time-ago';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

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
    console.log(post);
    TimeAgo.addLocale(en);
    TimeAgo.addLocale(ru);
    const navigate = useNavigate();
    const { title, content, student, subject, createdDate } = post;

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
                    <Answers>10+ answers</Answers>
                </Row>
            </Container>
        </>
    );
};

export default PostSection;
