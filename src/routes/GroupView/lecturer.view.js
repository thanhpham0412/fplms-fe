/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import { Calendar, DraftEditor, Overlay, Selection, Expand, AvatarGroup } from '../../components';
import { get, put } from '../../utils/request';
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

    const showDraft = (item) => {
        setValue(item.content);
        setDraftShow(true);
    };

    const topicPickedView = () => {
        return (
            <StyledList>
                {list.map((item, index) => (
                    <StyledItemLec feedback={item.type} key={index} onClick={() => showDraft(item)}>
                        <Title feedback={item.type}>{item.title}</Title>
                        <AvatarGroup slot={3} />
                    </StyledItemLec>
                ))}
            </StyledList>
        );
    };

    const getReports = () => {
        const progressReport = get('/management/progress-reports', { classId, groupId });

        Promise.all([progressReport]).then(([progressReport]) => {
            setList(progressReport.data.data);
        });
    };

    useEffect(() => {
        getReports();
    }, []);

    const submit = () => {
        put('/management/cycle-reports/feedback', {
            feedback: form.feedback,
            groupId: 0,
            mark: parseInt(form.mark),
            reportId: 0,
        });
    };

    const changeHandle = (field, value) => {
        console.log(field);
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
                            onChange={(e) => changeHandle}
                        />
                        <ScoreBar
                            placeholder="Score"
                            value={form.score}
                            onChange={(e) => changeHandle}
                        />
                    </ScoreBoard>
                </FeedBackView>
            </Overlay>
            <Container>
                {topicPickedView()}
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

export default LecturerView;
