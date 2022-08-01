/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';

import { Editor, EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import moment from 'moment';

import {
    Calendar,
    DraftEditor,
    Overlay,
    Selection,
    Expand,
    Avatars,
    Button,
    CreateMeetingForm,
    AdvanceEditor,
    Table,
    Row,
    TableHeader,
} from '../../components';
import { DraftRenderer } from '../../components/DraftEditor';
import { get, post, put } from '../../utils/request';
import { stringToColour } from '../../utils/style';
import { error, success } from '../../utils/toaster';
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
    Input,
    Type,
} from './style';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const LecturerView = ({ groupId, classId }) => {
    const [query, setQuery] = useState({
        viewState: EditorState.createEmpty(),
        editorState: EditorState.createEmpty(),
        cycleNumber: 0,
        mark: 0,
        title: '',
    });
    const [events, setEvents] = useState([
        {
            icon: null,
            title: null,
            status: null,
            time: null,
        },
    ]);
    const [isOpen, setOpen] = useState(false);
    const [form, setForm] = useState({
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm'),
        groupId: groupId,
        link: '',
        scheduleTime: `${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm')}:00.000`,
        title: '',
    });
    const [progress, setProgress] = useState([1, 10]);
    const [list, setList] = useState([]);
    const [isDraftOpen, setDraft] = useState(false);
    const edtior1 = useRef();
    const edtior2 = useRef();

    const setViewState = (state) => {
        setQuery((query) => ({
            ...query,
            viewState: state,
        }));
    };

    const setEditorState = (state) => {
        setQuery((query) => ({
            ...query,
            editorState: state,
        }));
    };

    const showDraft = (item) => {
        console.log(item);
        setDraft(() => {
            setViewState(EditorState.createWithContent(convertFromRaw(JSON.parse(item.content))));
            item.feedback &&
                setEditorState(
                    EditorState.createWithContent(convertFromRaw(JSON.parse(item.feedback)))
                );
            return true;
        });
        setQuery({
            ...query,
            reportId: parseInt(item.id),
            type: item.type,
            title: item.title,
        });
    };

    const TopicPickedView = React.memo(() => {
        return (
            <Table columns="200px 1fr 200px 200px">
                <TableHeader>
                    <div>Type</div>
                    <div>Report Title</div>
                    <div>Report Time</div>
                    <div>Write by</div>
                </TableHeader>
                {list &&
                    list.map((item, index) => (
                        <Row feedback={item.type} key={index} onClick={() => showDraft(item)}>
                            <Type type={item.type}>
                                {item.type == 'cycle' ? 'Cycle Report' : 'Progress Report'}
                            </Type>
                            <Title>{item.title}</Title>
                            <Title>{item.reportTime}</Title>
                            <Avatars list={['TP', 'NK', 'TN', 'TT', 'NH']} />
                        </Row>
                    ))}
            </Table>
        );
    });

    const getReports = () => {
        get('/cycle-reports', { groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) =>
                    list.concat(
                        res.data.data.map((data) => ({
                            ...data,
                            type: 'cycle',
                        }))
                    )
                );
            }
        });
        get('/progress-reports', { classId, groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) =>
                    list.concat(
                        res.data.data.map((data) => ({
                            ...data,
                            type: 'progress',
                        }))
                    )
                );
            }
        });
    };

    useEffect(() => {
        get('/meetings', {
            classId: parseInt(classId),
            endDate: moment(new Date())
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                .add(1, 'd')
                .format('yyyy-MM-DD HH:mm:ss.SSS'),
            startDate: moment(new Date())
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                .format('yyyy-MM-DD HH:mm:ss.SSS'),
            groupId: parseInt(groupId),
        }).then((res) => {
            if (res.data.code == 200) {
                const data = res.data.data.map((event) => ({
                    link: event.link,
                    id: event.id,
                    icon: <AssignmentIcon />,
                    title: event.title,
                    status: moment(new Date()).isAfter(event.scheduleTime) ? 'Done' : 'Incoming',
                    time: moment(event.scheduleTime).fromNow(),
                }));
                setEvents(data);
            }
        });
        getReports();
    }, []);

    const sendFeedback = () => {
        const API =
            query.type == 'cycle' ? '/cycle-reports/feedback' : '/progress-reports/feedback';
        put(API, {
            feedback: JSON.stringify(convertToRaw(query.editorState.getCurrentContent())),
            groupId: parseInt(groupId),
            mark: parseInt(query.mark),
            reportId: parseInt(query.reportId),
        })
            .then((res) => {
                if (res.data.code == 200) {
                    success('Feedback success');
                } else {
                    error('Feedback error');
                }
            })
            .catch(() => {
                error('An error occured while processing feedback');
            });
    };

    const changeHandle = (field, value) => {
        setQuery({
            ...query,
            [field]: value,
        });
    };

    const closeFn = () => {
        setOpen(false);
    };

    const onDateChange = (date) => {
        get('/meetings', {
            classId: parseInt(classId),
            endDate: moment(date).add(1, 'd').format('yyyy-MM-DD HH:mm:ss.SSS'),
            startDate: moment(date).format('yyyy-MM-DD HH:mm:ss.SSS'),
            groupId: parseInt(groupId),
        }).then((res) => {
            if (res.data.code == 200) {
                const data = res.data.data.map((event) => ({
                    link: event.link,
                    id: event.id,
                    icon: <AssignmentIcon />,
                    date: moment(event.scheduleTime).format('YYYY-MM-DD'),
                    title: event.title,
                    isAdd: false,
                    status: moment(event.scheduleTime).fromNow(),
                    time: moment(event.scheduleTime).fromNow(),
                    ...event,
                }));
                setEvents(data);
            }
        });
    };

    const openModal = () => {
        setOpen(() => {
            setForm({
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('HH:mm'),
                groupId: groupId,
                link: '',
                scheduleTime: `${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm')}:00.000`,
                title: '',
                isAdd: true,
            });
            return true;
        });
    };

    const openUpdate = (event) => {
        console.log(event.scheduleTime);
        setOpen(() => {
            setForm({
                id: event.id,
                date: moment(event.scheduleTime).format('YYYY-MM-DD'),
                time: moment(event.scheduleTime).format('HH:mm'),
                groupId: groupId,
                link: event.link,
                feedback: '',
                scheduleTime: `${moment(event.scheduleTime).format('YYYY-MM-DD')} ${moment(
                    event.scheduleTime
                ).format('HH:mm')}:00.000`,
                title: event.title,
                isAdd: false,
            });
            return true;
        });
    };

    const avts = ['TP', 'NK', 'TN', 'TT', 'NH'];

    return (
        <>
            {isDraftOpen ? (
                <Overlay isOpen={true} fullFill={true}>
                    <AdvanceEditor
                        closeFn={() => setDraft(false)}
                        editorState={query.viewState}
                        setEditorState={setViewState}
                        avatars={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                        readOnly
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
                            <span>{query.title}</span>
                        </GoalContainer>
                        <FeedBackContainer>
                            <GoalDes>Reports Feedback:</GoalDes>
                            <FeedBackView onClick={() => edtior2.current.focus()}>
                                <DraftEditor
                                    id={`feedback_${groupId}_${classId}`}
                                    editorRef={edtior2}
                                    placeholder="Write your feedback..."
                                    editorState={query.editorState}
                                    setEditorState={setEditorState}
                                />
                            </FeedBackView>
                            <GoalCounter>Reports need to be feedback</GoalCounter>
                            <GoalDes>Reports Score:</GoalDes>
                            <ScoreBar
                                placeholder="Score"
                                value={query.mark}
                                onChange={(e) => changeHandle('mark', parseFloat(e.target.value))}
                            />
                            <GoalCounter>Reports need to be scored</GoalCounter>
                        </FeedBackContainer>
                        <SendBtn onClick={sendFeedback}>Send Feedback</SendBtn>
                    </AdvanceEditor>
                </Overlay>
            ) : null}
            <CreateMeetingForm
                showing={isOpen}
                setForm={setForm}
                closeFn={closeFn}
                groupId={groupId}
                form={form}
                setEvents={setEvents}
            />
            <Container>
                <TopicPickedView />
                <SideBar>
                    <Calendar onChange={onDateChange} />
                    <StyledH4>
                        UP COMMING TASKS <Round>{events.length}</Round>
                    </StyledH4>
                    <CommingContainer>
                        {events.map((event, index) => (
                            <CommingSection key={index} onClick={() => openUpdate(event)}>
                                <Icon>{event.icon}</Icon>
                                <RightSide>
                                    <CommingTitle>{event.title}</CommingTitle>
                                    <Status>{event.status}</Status>
                                </RightSide>
                            </CommingSection>
                        ))}
                        <Button icon={<AddIcon />} onClick={openModal} />
                    </CommingContainer>
                </SideBar>
            </Container>
        </>
    );
};

export default LecturerView;
