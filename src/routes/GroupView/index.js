/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Calendar, DraftEditor, Overlay, Selection, Expand } from '../../components';
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
} from './style';

import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const GroupView = () => {
    const { groupId } = useParams();
    const [isPicked] = useState(false);

    const list = new Array(7)
        .fill({
            title: 'REPORT',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod' +
                'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' +
                'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' +
                'consequat. Duis aute irure dolor in reprehenderit in voluptate velit' +
                'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' +
                'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' +
                'consequat. Duis aute irure dolor in reprehenderit in voluptate velit' +
                'cillum dolore eu fugiat nulla pariatur...',
        })
        .map((e) => ({ ...e, type: Math.random() > 0.5 }));

    const [topicList] = useState([
        {
            name: 'Project base management',
            problem: '(Project has no problem)',
            actor: '(Project has no actor)',
            context: '(Project has no context)',
            theme: '(Project has no theme)',
            requirement:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod' +
                'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' +
                'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' +
                'consequat. Duis aute irure dolor in reprehenderit in voluptate velit' +
                'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' +
                'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' +
                'consequat. Duis aute irure dolor in reprehenderit in voluptate velit' +
                'cillum dolore eu fugiat nulla pariatur...',
        },
    ]);

    const test = (date) => {
        console.log(date);
    };

    const [draftIsShow, setDraftShow] = useState(false);

    const [reportType] = useState([
        {
            value: 1,
            content: 'Daily report',
        },
        {
            value: 2,
            content: 'Cycle report',
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

    const onChange = () => setDraftShow(true);

    const topicPickedView = () => {
        return (
            <StyledList>
                {list.map(({ content, type }, index) => (
                    <StyledItem feedback={type} key={index}>
                        <Title feedback={type}>
                            {(type ? 'FEEDBACK' : 'REPORT') + ' #' + index}
                        </Title>
                        <Content>{content}</Content>
                    </StyledItem>
                ))}
            </StyledList>
        );
    };

    const unPickView = () => {
        return (
            <PickContainer>
                <UnPickTitle>Pick a topic for your team:</UnPickTitle>
                <p>Once you picked a topic it will be applied to all of your team members.</p>
                <p>Remember to pick a topic carefully because this action can&apos;t be undone.</p>
                <TopicList>
                    {topicList.map((topic, index) => (
                        <Expand key={index} isOpen={false} title={topic.name}>
                            <Expand title="1. Context">
                                <p>{topic.context}</p>
                            </Expand>
                            <Expand title="2. Problem">
                                <p>{topic.problem}</p>
                            </Expand>
                            <Expand title="3. Requirement">
                                <p>{topic.requirement}</p>
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
                <DraftEditor groupId={groupId} setShow={setDraftShow} />
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

export default GroupView;
