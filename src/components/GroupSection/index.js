import { useState } from 'react';

import EditGroupForm from '../EditGroupForm';
import { Container, Header, Row, Project, Members, GroupBtn } from './style';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';

const GroupSection = () => {
    const [isCreate, setCreate] = useState(false);
    const [data, setData] = useState({
        group: 'GROUP 1',
        project: 'PROJECT BASE LMS',
        members: 6,
        date: 'mm-dd-yy',
    });
    return (
        <>
            <EditGroupForm showing={isCreate} data={data} setCreate={setCreate} setData={setData} />
            <Container>
                <Header>{data.group}</Header>
                <Row>
                    <BookIcon />
                    <Project>{data.project}</Project>
                </Row>
                <Row>
                    <PeopleIcon />
                    <Members>{`4/${data.members}Members`}</Members>
                </Row>
                <Row>
                    <AccessTimeIcon />
                    <Members>{data.date}</Members>
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
