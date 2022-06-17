import { useNavigate } from 'react-router-dom';

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

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const PostSection = () => {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <Row>
                    <Title
                        onClick={() => {
                            navigate(`/discussion-view`);
                        }}
                    >
                        What does the Fox says?
                    </Title>
                    <Course>SWP391</Course>
                </Row>
                <Row>
                    <PostContent>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut...
                    </PostContent>
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
                        <AccountCircleOutlinedIcon />
                        <p>
                            Posted by <span>phuongmtse161187</span> 2 days ago
                        </p>
                    </Author>
                    <Answers>10+ answers</Answers>
                </Row>
            </Container>
        </>
    );
};

export default PostSection;
