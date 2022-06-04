import {
    Container,
    Row,
    Title,
    Course,
    PostContent,
    PostFeature,
    Divider,
    Author,
    Answers,
    AuthorAva,
    FeatureList,
} from './style';

const PostSection = () => {
    return (
        <>
            <Container>
                <Row>
                    <Title>What does the Fox says?</Title>
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
                        <AuthorAva />
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
