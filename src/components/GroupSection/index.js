import { useState } from 'react';

import EditGroupForm from '../EditGroupForm';
import { Container, Header, Row, Project, Members, GroupBtn } from './style';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';

const GroupSection = ({ data }) => {
    const [isCreate, setCreate] = useState(false);
    const [group, setData] = useState({
        id: data.id,
        groupNum: data.number,
        members: data.memberQuantity,
        enrollTime: data.enrollTime,
    });
    return (
        <>
            <EditGroupForm showing={isCreate} data={data} setCreate={setCreate} setData={setData} />
            <Container>
                <Header>GROUP {group.groupNum}</Header>
                <Row>
                    <BookIcon />
                    <Project>Project-based Management System</Project>
                </Row>
                <Row>
                    <PeopleIcon />
                    <Members>{`4/${group.members}Members`}</Members>
                </Row>
                <Row>
                    <AccessTimeIcon />
                    <Members>{group.enrollTime}</Members>
                </Row>
                <Row>
                    <GroupBtn>View</GroupBtn>
                    <GroupBtn onClick={() => setCreate(true)}>Edit</GroupBtn>
                </Row>
            </Container>
        </>
    );
};

export default GroupSection;
