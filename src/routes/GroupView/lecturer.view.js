/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import {
    Calendar,
    DraftEditor,
    Overlay,
    Selection,
    Expand,
    AvatarGroup,
    Button,
} from '../../components';
import { get, put } from '../../utils/request';
import { error, success } from '../../utils/toaster';
import {
    Container,
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
    Status,
    Round,
    StyledItemLec,
    ScoreBoard,
    FeedBackView,
    ScoreBar,
    CommentInput,
} from './style';

import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const LecturerView = ({ groupId, classId }) => {
    const [list, setList] = useState([]);
    const [initValue, setValue] = useState('');
    const [form, setForm] = useState({
        feedback: '',
        score: '',
        reportId: 0,
    });

    const test = (date) => {
        console.log(date);
    };

    const [draftIsShow, setDraftShow] = useState(false);

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
            icon: <AssignmentIcon />,
            title: 'Meeting with group 4',
            status: 'done',
            time: 'Tomorrow',
        },
    ];

    const showDraft = (item) => {
        setValue(item.content);
        setDraftShow(true);
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
        const progressReport = get('/progress-reports', { classId, groupId });

        Promise.all([progressReport]).then(([progressReport]) => {
            setList(progressReport.data.data);
        });
    };

    useEffect(() => {
        getReports();
    }, []);

    const submit = () => {
        put('/cycle-reports/feedback', {
            feedback: form.feedback,
            groupId: parseInt(groupId),
            mark: parseInt(form.score),
            reportId: form.reportId,
        })
            .then((res) => {
                if (res.data.code === 200) {
                    success(`Feedback successfully!`);
                    setDraftShow(false);
                } else {
                    error(res.data.message);
                    setDraftShow(false);
                }
            })
            .catch((err) => error(err));
    };

    const changeHandle = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    return (
        <>
            <Overlay isOpen={draftIsShow}>
                <FeedBackView>
                    <DraftEditor
                        groupId={groupId}
                        setShow={setDraftShow}
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
                            value={form.feedback}
                            onChange={(e) => changeHandle('feedback', e.target.value)}
                        />
                        <ScoreBar
                            placeholder="Score"
                            value={form.score}
                            onChange={(e) => changeHandle('score', e.target.value)}
                        />
                    </ScoreBoard>
                </FeedBackView>
            </Overlay>
            <Container>
                {topicPickedView()}
                <SideBar>
                    <Calendar onChange={test} groupId={groupId} />
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
