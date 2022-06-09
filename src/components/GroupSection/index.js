import { useState } from 'react';

import EditGroupForm from '../EditGroupForm';
import { Container, Header, Row, Project, Members, GroupBtn } from './style';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';

const GroupSection = ({ data }) => {
    const [isCreate, setCreate] = useState(false);
    const [group, setGroup] = useState({
        id: data.id,
        members: data.memberQuantity,
        groupNum: data.number,
        enrollTime: data.enrollTime,
    });
    return (
        <>
            <EditGroupForm
                showing={isCreate}
                data={group}
                setCreate={setCreate}
                setGroup={setGroup}
            />
            <Container>
                <Header>GROUP {group.groupNum}</Header>
                <Row>
                    <BookIcon />
                    <Project>FLMS</Project>
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
