/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';

import { Editor, EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import moment from 'moment';

import {
    Calendar,
    DraftEditor,
    Overlay,
    Selection,
    Expand,
    AvatarGroup,
    Button,
    CreateMeetingForm,
} from '../../components';
import { DraftRenderer } from '../../components/DraftEditor';
import { get, post, put } from '../../utils/request';
import { stringToColour } from '../../utils/style';
import { success } from '../../utils/toaster';
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
} from './style';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const LecturerView = ({ groupId, classId }) => {
    const [editorStateStudent, setEditorStateStudent] = useState(EditorState.createEmpty());
    const [editorStateFeedback, setEditorStateFeedback] = useState(EditorState.createEmpty());

    const [list, setList] = useState([]);
    const [form, setForm] = useState({
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm'),
        score: 0,
    });
    const [isOpen, setOpen] = useState(false);
    const [isDraftOpen, setDraft] = useState(false);
    const edtior1 = useRef();
    const edtior2 = useRef();

    const events = [
        {
            icon: <ArticleIcon />,
            title: 'Feedback reports',
            status: 'Upcomming',
            time: 'Today at 16h10',
        },
        {
            icon: <RadioButtonCheckedIcon />,
            title: 'Meeting with group 3',
            status: 'Upcomming',
            time: 'Today at 20h00',
        },
        {
            icon: <ArrowBackIosNewIcon />,
            title: 'Meeting with group 4',
            status: 'done',
            time: 'Tomorrow',
        },
    ];

    const showDraft = (item) => {
        setDraft(() => {
            setEditorStateStudent(JSON.parse(item.content));
            return true;
        });
        setForm({
            ...form,
            reportId: parseInt(item.id),
        });
    };

    const topicPickedView = () => {
        return (
            <>
                <StyledList>
                    {list &&
                        list.map((item, index) => (
                            <StyledItemLec
                                feedback={item.type}
                                key={index}
                                onClick={() => showDraft(item)}
                            >
                                <Title feedback={item.type}>{item.title}</Title>
                                <AvatarGroup slot={3} />
                            </StyledItemLec>
                        ))}
                </StyledList>
            </>
        );
    };

    const getReports = () => {
        const cycleReport = get('/management/cycle-reports', { groupId });
        const progressReport = get('/management/progress-reports', { classId, groupId });

        Promise.all([cycleReport, progressReport]).then(([cycleReport, progressReport]) => {
            setList(cycleReport.data.data.concat(progressReport.data.data));
        });
    };

    useEffect(() => {
        getReports();
    }, []);

    const sendFeedback = () => {
        post('/management/cycle-reports/feedback', {
            content: JSON.stringify(convertToRaw(editorStateFeedback.getCurrentContent())),
            title: 'Feedback',
            groupId: parseInt(groupId),
            resourceLink: '',
            mark: parseInt(form.score),
        }).then((res) => {
            console.log(res);
            success('Feedback success');
        });
    };

    const changeHandle = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const closeFn = () => {
        setOpen(false);
    };

    const onDateChange = (date) => {
        setOpen(() => {
            console.log(form);
            setForm({
                ...form,
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('HH:mm'),
            });
            return true;
        });
    };

    const avts = ['TP', 'NK', 'TN', 'TT', 'NH'];

    return (
        <>
            {isDraftOpen ? (
                <Overlay isOpen={true} fullFill={true}>
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
                            <StudentFeedBack onClick={() => edtior1.current.focus()}>
                                <DraftRenderer editorState={editorStateStudent} />
                            </StudentFeedBack>
                            <EditorSideBar>
                                <GoalContainer>
                                    <GoalDes>Reports Stats:</GoalDes>
                                    <StatusBar />
                                    <GoalCounter>
                                        <span>100</span> / 700
                                    </GoalCounter>
                                </GoalContainer>
                                <GoalContainer>
                                    <GoalDes>Reports Score:</GoalDes>
                                    <ScoreBar
                                        placeholder="Score"
                                        value={form.score}
                                        onChange={(e) => changeHandle('score', e.target.value)}
                                    />
                                    <GoalCounter>Progress reports need to be score</GoalCounter>
                                </GoalContainer>
                                <FeedBackContainer>
                                    <GoalDes>Reports Feedback:</GoalDes>
                                    <FeedBackView onClick={() => edtior2.current.focus()}>
                                        <DraftEditor
                                            id={`feedback_${groupId}_${classId}`}
                                            editorRef={edtior2}
                                            placeholder="Write your feedback..."
                                            editorState={editorStateFeedback}
                                            setEditorState={setEditorStateFeedback}
                                        />
                                    </FeedBackView>
                                    <GoalCounter>Reports need to be feedback</GoalCounter>
                                </FeedBackContainer>
                                <SendBtn onClick={sendFeedback}>Send Feedback</SendBtn>
                            </EditorSideBar>
                        </BottomSide>
                    </EditorContainer>
                </Overlay>
            ) : null}
            <CreateMeetingForm showing={isOpen} closeFn={closeFn} form={form} />
            {/* <Overlay isOpen={isDraftOpen}>
                <FeedBackView>
                    <DraftEditor
                        groupId={groupId}
                        setShow={setDraft}
                        submit={submit}
                        initValue={initValue}
                        readonly={true}
                    />
                    <ScoreBoard>
                        <CommentInput
                            maxRows={14}
                            minRows={7}
                            aria-label="maximum height"
                            placeholder="Feedback"
                            onChange={(e) => changeHandle('feedback', e.target.value)}
                        />
                        <ScoreBar
                            placeholder="Score"
                            value={form.score}
                            onChange={(e) => changeHandle('score', e.target.value)}
                        />
                    </ScoreBoard>
                </FeedBackView>
            </Overlay> */}
            <Container>
                {topicPickedView()}
                <SideBar>
                    <Calendar onChange={onDateChange} />
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

export default LecturerView;
