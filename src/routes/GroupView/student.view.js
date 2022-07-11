/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext, useRef } from 'react';

import { Editor, EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';

import { Calendar, DraftEditor, Overlay, Selection, Expand, AvatarGroup } from '../../components';
import { DraftRenderer } from '../../components/DraftEditor';
import LoadOverLayContext from '../../contexts/loadOverlay';
import { get, put, post } from '../../utils/request';
import { stringToColour } from '../../utils/style';
import { success, error } from '../../utils/toaster';
import {
    Container,
    EditorContainer,
    EditorSideBar,
    BottomSide,
    Header,
    StyledList,
    StyledItem,
    Title,
    Content,
    SideBar,
    CommingContainer,
    Icon,
    CommingSection,
    RightSide,
    StyledH4,
    CommingTitle,
    GoalContainer,
    Status,
    Round,
    StyledItemLec,
    ScoreBoard,
    FeedBackView,
    FeedBackContainer,
    ScoreBar,
    CommentInput,
    GoalCounter,
    GoalDes,
    StatusBar,
    BackBtn,
    SendBtn,
    GroupAvatar,
    Avatar,
    StudentFeedBack,
    Select,
    PickContainer,
    TopicList,
    UnPickTitle,
    PickHeader,
    FeedBackBar,
    PickBtn,
} from './style';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const StudentView = ({ groupId, classId }) => {
    const loadOverlay = useContext(LoadOverLayContext);
    const [isPicked, setPicked] = useState(false);
    const [draftIsShow, setDraftShow] = useState(false);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editor = useRef();

    const [list, setList] = useState([
        {
            content: 'Hello world',
            type: 'feedback',
            feedback: 'hello world',
        },
    ]);

    const [topicList, setTopicList] = useState([]);

    const test = (date) => {
        console.log(date);
    };

    const submitCycle = (value) => {
        const data = {
            title: 'DRAFT',
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            resourceLink: '',
            groupId: groupId,
        };
        post('/' + (value == 1 ? 'cycle-reports' : 'progress-reports'), data)
            .then((res) => {
                if (res.data.code == 200) {
                    success(res.data.message);
                    setList((list) => {
                        return list.concat(data);
                    });
                    setDraftShow(false);
                } else {
                    error(res.data.message);
                    setDraftShow(false);
                }
            })
            .catch(() => {
                error('An error occured');
                setDraftShow(false);
            });
    };

    const [isDraftOpen, setDraft] = useState(false);

    const [reportType] = useState([
        {
            value: 1,
            content: 'Cycle report',
        },
        {
            value: 2,
            content: 'Progress report',
        },
    ]);

    const events = [
        {
            icon: <ArticleIcon />,
            title: 'Report your tasks',
            status: 'Upcomming',
            time: 'Today at 16h10',
        },
        {
            icon: <RadioButtonCheckedIcon />,
            title: 'Meeting with lecturers',
            status: 'Upcomming',
            time: 'Today at 20h00',
        },
        {
            icon: <AssignmentIcon />,
            title: 'Done your tasks',
            status: 'done',
            time: 'Tomorrow',
        },
    ];

    const [type, setType] = useState({ value: 1, content: 'progress-reports' });

    const onChange = (e) => {
        setDraft(true);
        setType(e);
    };

    const topicPickedView = () => {
        return (
            <StyledList>
                {list.map(({ content, type, feedback }, index) => (
                    <StyledItem feedback={type} key={index}>
                        <Title feedback={type}>
                            {(type ? 'FEEDBACK' : 'REPORT') + ' #' + index}
                        </Title>
                        {content && (
                            <DraftRenderer editorState={JSON.parse(content)}></DraftRenderer>
                        )}
                        <p>Feedback</p>
                        <Content>{feedback || '(This report has no feedback)'}</Content>
                    </StyledItem>
                ))}
            </StyledList>
        );
    };

    const getCycleReport = () => {
        const cycleReport = get('/cycle-reports', { classId, groupId });
        const progressReport = get('/progress-reports', { classId, groupId });

        Promise.all([cycleReport, progressReport]).then(([cycleReport, progressReport]) => {
            setList(cycleReport.data.data.concat(progressReport.data.data));
        });
    };

    useEffect(() => {
        loadOverlay.setText('Loading');
        loadOverlay.setActive(true);

        getCycleReport();

        get('/projects', { classId }).then((res) => {
            const data = res.data.data;
            console.log(data);
            if (data) setTopicList(data);
        });
        get(`/classes/${classId}/groups/details`)
            .then((res) => {
                const data = res.data.data;
                if (data.projectDTO) {
                    setPicked(true);
                }
                loadOverlay.setActive(false);
            })
            .catch(() => {
                loadOverlay.setActive(false);
            });
    }, []);

    const pickTopic = (topic) => {
        put(`/projects/${topic.id}`, {}, { params: { classId } }).then((res) => {
            const data = res.data.data;
            if (res.data.code == 200) {
                success(`Choose project successfully!`);
            }
        });
    };

    const unPickView = () => {
        return (
            <PickContainer>
                <UnPickTitle>Pick a topic for your team:</UnPickTitle>
                <p>Once you picked a topic it will be applied to all of your team members.</p>
                <p>Remember to pick a topic carefully because this action can&apos;t be undone.</p>
                <TopicList>
                    {Array.isArray(topicList) &&
                        topicList.map((topic, index) => (
                            <Expand
                                key={index}
                                isOpen={false}
                                title={
                                    <PickHeader>
                                        <span>{topic.name}</span>
                                        <PickBtn onClick={() => pickTopic(topic)}>
                                            Choose Project
                                        </PickBtn>
                                    </PickHeader>
                                }
                            >
                                <Expand isOpen={false} title="1. Context">
                                    <p>{topic.context}</p>
                                </Expand>
                                <Expand isOpen={false} title="2. Problem">
                                    <p>{topic.problem}</p>
                                </Expand>
                                <Expand isOpen={false} title="3. Requirements">
                                    <p>{topic.requirements}</p>
                                </Expand>
                            </Expand>
                        ))}
                </TopicList>
            </PickContainer>
        );
    };

    const avts = ['TP', 'NK', 'TN', 'TT', 'NH'];

    return (
        <>
            <Overlay isOpen={isDraftOpen} fullFill={true}>
                <EditorContainer>
                    <Header>
                        <BackBtn onClick={() => setDraft(false)}>
                            <ArrowBackIosNewIcon fontSize="small" /> Group View
                        </BackBtn>
                        <GroupAvatar>
                            {avts.map((avatar, index) => (
                                <Avatar
                                    key={index}
                                    size={32}
                                    color={stringToColour(avatar + avts.join(''))}
                                >
                                    <span src="./ben.png">{avatar}</span>
                                </Avatar>
                            ))}
                        </GroupAvatar>
                    </Header>
                    <BottomSide>
                        <StudentFeedBack onClick={() => editor.current.focus()}>
                            <DraftEditor
                                editorRef={editor}
                                editorState={editorState}
                                setEditorState={setEditorState}
                            />
                        </StudentFeedBack>
                        <EditorSideBar>
                            <GoalContainer>
                                <GoalDes>Reports Stats:</GoalDes>
                                <StatusBar />
                                <GoalCounter>
                                    <span>100</span> / 700
                                </GoalCounter>
                            </GoalContainer>
                            <SendBtn onClick={() => submitCycle(1)}>Send Report</SendBtn>
                        </EditorSideBar>
                    </BottomSide>
                </EditorContainer>
            </Overlay>
            {isPicked && (
                <Select>
                    <Selection
                        options={reportType}
                        placeholder="Write Report"
                        fixed
                        reset={true}
                        onChange={onChange}
                    ></Selection>
                </Select>
            )}
            <Container>
                {isPicked ? topicPickedView() : unPickView()}
                <SideBar>
                    <Calendar onChange={test} />
                    <StyledH4>
                        UP COMMING TASKS <Round>3</Round>
                    </StyledH4>
                    <CommingContainer>
                        {events.map(({ icon, title, status, time }, index) => (
                            <CommingSection key={index}>
                                <Icon>{icon}</Icon>
                                <RightSide>
                                    <CommingTitle>{title}</CommingTitle>
                                    <Status status={status}>{time}</Status>
                                </RightSide>
                            </CommingSection>
                        ))}
                    </CommingContainer>
                </SideBar>
            </Container>
        </>
    );
};

export default StudentView;
