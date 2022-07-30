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
    AdvanceEditor,
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
} from './style';

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

    const [list, setList] = useState([]);
    const [isOpen, setOpen] = useState(false);
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
            title: item.title,
        });
    };

    const topicPickedView = () => {
        console.log('render list');
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
        get('/cycle-reports', { groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) => list.concat(res.data.data || []));
            }
        });
        get('/progress-reports', { classId, groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) => list.concat(res.data.data || []));
            }
        });
    };

    useEffect(() => {
        getReports();
    }, []);

    const sendFeedback = () => {
        put('/cycle-reports/feedback', {
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
        setOpen(() => {
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
                            <StatusBar />
                            <GoalCounter>
                                <span>100</span> / 700
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
                        </FeedBackContainer>
                        <GoalContainer>
                            <GoalDes>Reports Score:</GoalDes>
                            <ScoreBar
                                placeholder="Score"
                                value={query.mark}
                                onChange={(e) => changeHandle('mark', parseFloat(e.target.value))}
                            />
                            <GoalCounter>Progress reports need to be score</GoalCounter>
                        </GoalContainer>
                        <SendBtn onClick={sendFeedback}>Send Feedback</SendBtn>
                    </AdvanceEditor>
                </Overlay>
            ) : null}
            <CreateMeetingForm showing={isOpen} closeFn={closeFn} groupId={groupId} />
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
