/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext, useRef } from 'react';

import { Editor, EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';

import {
    Calendar,
    DraftEditor,
    Overlay,
    Selection,
    Skeleton,
    NoResult,
    AdvanceEditor,
} from '../../components';
import { DraftRenderer } from '../../components/DraftEditor';
import LoadOverLayContext from '../../contexts/loadOverlay';
import { getTokenInfo } from '../../utils/account';
import { getRndInteger } from '../../utils/random';
import { get, put, post } from '../../utils/request';
import { stringToColour } from '../../utils/style';
import { success, error } from '../../utils/toaster';
import { fromHTML } from '../../utils/draft';
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
    NeResultContainer,
    GoalCounter,
    GoalDes,
    StatusBar,
    BackBtn,
    SendBtn,
    GroupAvatar,
    Avatar,
    StudentFeedBack,
    Select,
    Input,
    StudentViewContainer,
} from './style';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const FeedBack = ({ list }) => {
    return (
        <StyledList>
            {list.map(({ content, type, feedback, title }, index) => {
                return (
                    <StyledItem feedback={type} key={index}>
                        <Title feedback={type}>{title}</Title>
                        {content && (
                            <DraftRenderer
                                editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(content)))}
                            ></DraftRenderer>
                        )}
                        <div>Feedback</div>
                        <Content>{feedback || <p>(This report has no feedback)</p>}</Content>
                    </StyledItem>
                );
            })}
        </StyledList>
    );
};

const TopicList = ({
    isOpen,
    closeFn,
    avatars,
    editorState,
    topicList,
    viewTopic,
    pickTopic,
    setEditorState,
}) => {
    return (
        <Overlay isOpen={isOpen} fullFill={true}>
            <AdvanceEditor
                avatars={avatars}
                closeFn={closeFn}
                editorState={editorState}
                setEditorState={setEditorState}
                readOnly
            >
                {topicList.length > 0 ? (
                    topicList.map((item) => (
                        <GoalContainer data-type="topic" key={item.id} onClick={() => viewTopic(item)}>
                            <GoalDes>
                                {item.name || <Skeleton style={{ width: `${getRndInteger(20, 40)}ch` }} />}
                            </GoalDes>
                            {item.name ? (
                                <button onClick={() => pickTopic(item)}>Select</button>
                            ) : (
                                <Skeleton style={{ width: '6ch' }} />
                            )}
                        </GoalContainer>
                    ))
                ) : (
                    <NeResultContainer>
                        <NoResult>
                            <h4>There is no topic for now</h4>
                        </NoResult>
                    </NeResultContainer>
                )}
            </AdvanceEditor>
        </Overlay>
    );
};

const TEMPLATE = '<h1>Pick a topic for your team:</h1>' +
    '<h2>Choose your own topic on the pannel on the left</h2>' +
    '<p>Once you picked, the topic will apply to all of your team member</p>' +
    '<p>Be carefully because this action can\'t be undone</p>'

const StudentView = ({ groupId, classId }) => {
    const loadOverlay = useContext(LoadOverLayContext);
    const [isPicked, setPicked] = useState(false);
    const [isEditorOpen, setEditorOpen] = useState(false);
    const [isTopicOpen, setTopicOpen] = useState(false);
    const [topicState, setTopicState] = useState(EditorState.createWithContent(fromHTML(TEMPLATE)));
    const [title, setTitle] = useState('');
    const [reportType, setReportType] = useState([
        {
            value: 2,
            content: 'Progress report',
        },
    ]);
    const [list, setList] = useState([]);
    const [type, setType] = useState({ value: 1, content: 'progress-reports' });

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editor = useRef();

    const [topicList, setTopicList] = useState(
        new Array(20).fill('').map((k, i) => ({
            name: '',
            id: i,
        }))
    );

    const user = getTokenInfo();

    const test = (date) => {
        console.log(date);
    };

    const submitCycle = (type) => {
        const data = {
            title: title,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            resourceLink: '',
            groupId: parseInt(groupId),
        };
        post('/' + (type.value == 1 ? 'cycle-reports' : 'progress-reports'), data)
            .then((res) => {
                if (res.data.code == 200) {
                    success(res.data.message);
                    setList((list) => {
                        return list.concat(data);
                    });
                    setEditorOpen(false);
                } else {
                    error(res.data.message);
                    setEditorOpen(false);
                }
            })
            .catch(() => {
                error('An error occured');
                setEditorOpen(false);
            });
    };

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

    const onChange = (e) => {
        setEditorOpen(true);
        setType(e);
    };

    const getReports = () => {
        get('/cycle-reports', { classId, groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) => list.concat(res.data.data || []));
            }
        });
        get('/progress-reports', { classId, groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) => list.concat(res.data.data || []));
            }
        });
        // Promise.all([cycleReport, progressReport]).then(([cycleReport, progressReport]) => {
        //     setList(cycleReport.data.data.concat(progressReport.data.data));
        // });
    };

    useEffect(() => {
        // loadOverlay.setText('Loading');
        // loadOverlay.setActive(true);
        get(`/classes/${classId}/groups/details`, { classId: classId }).then((res) => {
            const data = res.data.data;
            if (res.data.code == 200) {
                if (data.projectDTO == null) {
                    const student = data.studentDtoSet.filter(
                        (student) => student.email == user.email
                    )[0];
                    if (student && student.id == data.leaderId) {
                        setReportType((reportType) => {
                            return reportType.concat({
                                value: 1,
                                content: 'Cycle report',
                            })
                        })
                        setTopicOpen(true);
                        get('/projects', { classId }).then((res) => {
                            const data = res.data;
                            if (data.code == 200) setTopicList(data.data);
                        });
                    }
                } else {
                    const student = data.studentDtoSet.filter(
                        (student) => student.email == user.email
                    )[0];
                    if (student && student.id == data.leaderId) {
                        setReportType((reportType) => {
                            return reportType.concat({
                                value: 1,
                                content: 'Cycle report',
                            })
                        })
                    }
                    getReports();
                }
            } else {
                error('An error occurred');
            }
        });
    }, []);

    const pickTopic = (topic) => {
        put(`/projects/${topic.id}`, {}, { params: { classId } })
            .then((res) => {
                const data = res.data.data;
                if (res.data.code == 200) {
                    success(`Choose project successfully!`);
                } else {
                    error('An error occurred while picking project. Please try agian');
                }
            })
            .catch(() => {
                error('An error occurred while picking project. Please try agian');
            });
    };

    const viewTopic = (item) => {
        console.log(item);
        const raw = convertFromRaw(JSON.parse(item.requirements));
        setTopicState(EditorState.createWithContent(raw));
    };

    const avts = ['TP', 'NK', 'TN', 'TT', 'NH'];

    return (
        <StudentViewContainer>
            <Overlay isOpen={isEditorOpen} fullFill={true}>
                <AdvanceEditor
                    closeFn={() => setEditorOpen(false)}
                    avatars={avts}
                    editorState={editorState}
                    setEditorState={setEditorState}
                >
                    <GoalContainer>
                        <GoalDes>Reports Stats:</GoalDes>
                        <StatusBar />
                        <GoalCounter>
                            <span>100</span> / 700
                        </GoalCounter>
                    </GoalContainer>
                    <GoalContainer>
                        <GoalDes>Report Title</GoalDes>
                        <Input
                            placeholder={"Report's Title"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value || '')}
                        />
                    </GoalContainer>
                    <SendBtn onClick={() => submitCycle(type)}>Send Report</SendBtn>
                </AdvanceEditor>
            </Overlay>
            <Select>
                <Selection
                    options={reportType}
                    placeholder="Write Report"
                    fixed
                    reset={true}
                    onChange={onChange}
                ></Selection>
            </Select>
            <Container>
                {list.length ? (
                    <FeedBack list={list} />
                ) : (
                    <NeResultContainer>
                        <NoResult>
                            <h2>You have no reports</h2>
                        </NoResult>
                    </NeResultContainer>
                )}
                <TopicList
                    isOpen={isTopicOpen}
                    avatars={['TP', 'NK', 'TN', 'TT', 'NH']}
                    editorState={topicState}
                    topicList={topicList}
                    viewTopic={viewTopic}
                    pickTopic={pickTopic}
                    closeFn={() => setTopicOpen(false)}
                    setTopicState={setTopicState}
                />
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
        </StudentViewContainer>
    );
};

export default StudentView;
