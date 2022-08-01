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

import moment from 'moment';

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
    console.log(list[0].type);
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
    '<h2>Choose your own topic on the pannel on the right</h2>' +
    '<p>Once you picked, the topic will apply to all of your team member</p>' +
    '<p>Be carefully because this action can\'t be undone</p>'

const TEMPLATE2 = `
<h1>Reports agenda</h1>
<p>
Whether you’re meeting in-person or meeting asynchronously, these four agenda items will keep you and your team on top of your sprint.
</p>
<ol>
	<h2>1. Blockers</h2>
    <p>Is there anything preventing contributors from getting work done? Things to bring up here might be technical limitations, departmental and team dependencies, and personal limitations (like vacations booked, people out sick, etc.).</p>
    <h2>2. What you have done?</h2>
    <p>This is a quick rundown of what got done (and if anything didn’t get done, then why). This isn’t the time for each person to run down their whole to-do list – they should focus on the large chunks of work that made up their deep focus time, and the activities that are relevant to your team as a whole.</p>
    <h2>3. What are your goals?</h2>
    <p>Here, each team member will say what they want to accomplish – in other words, what they can be held accountable for in tomorrow’s daily scrum meeting.</p>
    <h2>4. How close are we to hitting our sprint goals? What’s your comfort level?</h2>
    <p>This agenda item will help the scrum master get an idea of how the team is feeling about how their day-to-day activities are impacting overall goals for the team, and how contributors are feeling about the pace of the sprint.</p>
</ol>
`

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
    const [progress, setProgress] = useState([1, 10]);
    const [list, setList] = useState([]);
    const [type, setType] = useState({ value: 1, content: 'progress-reports' });
    const [events, setEvents] = useState([]);

    const [editorState, setEditorState] = useState(EditorState.createWithContent(fromHTML(TEMPLATE2)));
    const editor = useRef();

    const [topicList, setTopicList] = useState(
        new Array(20).fill('').map((k, i) => ({
            name: '',
            id: i,
        }))
    );

    const user = getTokenInfo();

    const calendarChange = (date) => {
        get('/meetings', {
            classId: parseInt(classId),
            endDate: moment(date).add(1, 'd').format('yyyy-MM-DD HH:mm:ss.SSS'),
            startDate: moment(date).format('yyyy-MM-DD HH:mm:ss.SSS'),
            groupId: parseInt(groupId),
        }).then((res) => {
            if (res.data.code == 200) {
                const data = res.data.data.map((event) => (
                    {
                        link: event.link,
                        id: event.id,
                        icon: <AssignmentIcon />,
                        title: event.title,
                        status: moment(new Date()).isAfter(event.scheduleTime) ? 'Done' : 'Incoming',
                        time: moment(event.scheduleTime).fromNow(),
                    }
                ))
                setEvents(data);
            }
        })
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

    const onChange = (e) => {
        setProgress((progress) => {
            return [list.filter((report) => report.type == 'cycle').length, progress[1]];
        })
        setEditorOpen(true);
        setType(e);
    };

    const getReports = () => {
        get('/cycle-reports', { classId, groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) => list.concat(res.data.data.map((data) => ({
                    ...data,
                    type: 'cycle',
                }))));
            }
        });
        get('/progress-reports', { classId, groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) => list.concat(res.data.data.map((data) => ({
                    ...data,
                    type: 'progress',
                }))));
            }
        });
        // Promise.all([cycleReport, progressReport]).then(([cycleReport, progressReport]) => {
        //     setList(cycleReport.data.data.concat(progressReport.data.data));
        // });
    };

    useEffect(() => {
        loadOverlay.setText('Looking for your group...');
        loadOverlay.setActive(true);
        get('/meetings', {
            classId: parseInt(classId),
            endDate: moment(new Date()).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(1, 'd').format('yyyy-MM-DD HH:mm:ss.SSS'),
            startDate: moment(new Date()).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('yyyy-MM-DD HH:mm:ss.SSS'),
            groupId: parseInt(groupId),
        }).then((res) => {
            if (res.data.code == 200) {
                const data = res.data.data.map((event) => (
                    {
                        link: event.link,
                        id: event.id,
                        icon: <AssignmentIcon />,
                        title: event.title,
                        status: moment(new Date()).isAfter(event.scheduleTime) ? 'Done' : 'Incoming',
                        time: moment(event.scheduleTime).fromNow(),
                    }
                ))
                setEvents(data);
            }
        })
        get(`/classes/${classId}`).then((res) => {
            if (res.data.code == 200) {
                setProgress((progress) => [progress[0], res.data.data.cycleDuration]);
            }
        });
        get(`/classes/${classId}/groups/details`, { classId: classId }).then((res) => {
            const data = res.data.data;
            if (res.data.code == 200) {
                if (data.projectDTO == null) {
                    const student = data.studentDtoSet.filter(
                        (student) => student.email == user.email
                    )[0];
                    if (student && student.id == data.leaderId) {
                        setTopicOpen(true);
                        setPicked(false);
                        get('/projects', { classId }).then((res) => {
                            const data = res.data;
                            if (data.code == 200) setTopicList(data.data);
                        });
                    }
                    loadOverlay.setActive(false);
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
                    setPicked(true);
                    loadOverlay.setActive(false);
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
                    setPicked(true);
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
                        <StatusBar progress={progress} />
                        <GoalCounter>
                            <span>{progress[0]}</span> / {progress[1]}
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
                    <Selection
                        disable={!isPicked}
                        options={reportType}
                        placeholder="Write Report"
                        fixed
                        reset={true}
                        onChange={onChange}
                    />
                    <Calendar onChange={calendarChange} />
                    <StyledH4>
                        UP COMMING TASKS <Round>{events.length}</Round>
                    </StyledH4>
                    <CommingContainer>
                        {events.map(({ icon, title, status, time, id, link }) => (
                            <CommingSection key={id}>
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
