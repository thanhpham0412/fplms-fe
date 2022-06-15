import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Calendar, DraftEditor, Overlay, Selection } from '../../components';
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
} from './style';

import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const GroupView = () => {
    const { groupId } = useParams();

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

    return (
        <>
            <Select>
                <Selection
                    options={reportType}
                    placeholder="Write Report"
                    fixed
                    onChange={onChange}
                ></Selection>
            </Select>
            <Overlay showing={draftIsShow}>
                <DraftEditor groupId={groupId} setShow={setDraftShow} />
            </Overlay>
            <Container>
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
