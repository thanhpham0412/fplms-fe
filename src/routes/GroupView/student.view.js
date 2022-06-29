/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';

import { Calendar, DraftEditor, Overlay, Selection, Expand, AvatarGroup } from '../../components';
import LoadOverLayContext from '../../contexts/loadOverlay';
import { get, put, post } from '../../utils/request';
import { success, error } from '../../utils/toaster';
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
    Select,
    PickContainer,
    TopicList,
    UnPickTitle,
    PickHeader,
    FeedBackBar,
    PickBtn,
    StyledItemLec,
} from './style';

import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const StudentView = ({ groupId, classId }) => {
    const loadOverlay = useContext(LoadOverLayContext);
    const [isPicked, setPicked] = useState(false);

    const [list, setList] = useState([
        {
            content: 'Hello world',
            type: 'feedback',
            feedback: 'hello world',
        },
    ]);

    const [topicList, setTopicList] = useState([
        {
            content: 'Hello world',
            type: 'feedback',
            feedback: 'hello world',
        },
    ]);

    const test = (date) => {
        console.log(date);
    };

    const submitCycle = (value) => {
        post('/management/' + (type.value == 1 ? 'cycle-reports' : 'progress-reports'), {
            title: 'DRAFT',
            content: value,
            resourceLink: '',
            groupId: groupId,
        })
            .then((res) => {
                if (res.data.code == 200) {
                    success(res.data.message);
                    setList((list) => {
                        return list.concat({
                            title: 'DRAFT',
                            content: value,
                            resourceLink: '',
                            groupId: groupId,
                        });
                    });
                } else {
                    error(res.data.message);
                }
            })
            .catch(() => {
                error('An error occured');
            });
    };

    const [draftIsShow, setDraftShow] = useState(false);

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
        setDraftShow(true);
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
                        <Content>{content}</Content>
                        <p>Feedback</p>
                        <Content>{feedback || '(This report has no feedback)'}</Content>
                    </StyledItem>
                ))}
            </StyledList>
        );
    };

    const getCycleReport = () => {
        const cycleReport = get('/management/cycle-reports', { classId, groupId });
        const progressReport = get('/management/progress-reports', { classId, groupId });

        Promise.all([cycleReport, progressReport]).then(([cycleReport, progressReport]) => {
            setList(cycleReport.data.data.concat(progressReport.data.data));
        });
    };

    useEffect(() => {
        loadOverlay.setText('Loading');
        loadOverlay.setActive(true);

        getCycleReport();

        get('/management/projects', { classId }).then((res) => {
            const data = res.data.data;
            console.log(data);
            if (data) setTopicList(data);
        });
        get(`/management/classes/${classId}/groups/details`)
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
        put(`/management/projects/${topic.id}`, {}, { params: { classId } }).then((res) => {
            const data = res.data.data;
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

    return (
        <>
            <Overlay isOpen={draftIsShow}>
                <DraftEditor
                    groupId={groupId}
                    setShow={setDraftShow}
                    type={type}
                    submit={submitCycle}
                />
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
