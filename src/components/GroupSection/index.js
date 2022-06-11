import { useEffect, useState } from 'react';

import axios from 'axios';

import AvatarGroup from '../AvatarGroup';
import EditGroupForm from '../EditGroupForm';
import { Container, Header, Row, Project, Members, GroupBtn, JoinBtn } from './style';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';

const GroupSection = ({ data, class_ID, role, isJoined, setJoin, groupId }) => {
    const [isCreate, setCreate] = useState(false);
    const [disable, setDisable] = useState(false);
    const [btnStyle, setBtnStyle] = useState(false);
    const [slot, setSlot] = useState(3);
    const [group, setGroup] = useState({
        id: data.id,
        groupNum: data.groupNum,
        members: data.memberQuantity,
        enrollTime: data.enrollTime,
    });
    const TOKEN = process.env.REACT_APP_TOKEN;
    const currentDate = new Date();
    const URL =
        process.env.REACT_APP_API_URL + `/management/classes/${class_ID}/groups/${groupId}/join`;
    const header = {
        Authorization: `${TOKEN}`,
    };

    const handleJoinBtn = async () => {
        await axios
            .post(URL, { headers: header })
            .then(() => {
                setJoin(true);
                setBtnStyle(true);
                setSlot((prev) => prev + 1);
            })
            .catch(() => {
                setJoin(true);
                setBtnStyle(true);
                setSlot((prev) => prev + 1);
            });
    };
    //Disable Join button base on slot an time
    useEffect(() => {
        if (slot == group.members) {
            setDisable(true);
        } else if (isJoined || currentDate > new Date(group.enrollTime)) {
            setDisable(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slot, isJoined]);

    return (
        <>
            <EditGroupForm
                showing={isCreate}
                group={group}
                setCreate={setCreate}
                setGroup={setGroup}
                class_ID={class_ID}
            />
            <Container>
                <Header>GROUP {group.groupNum}</Header>
                <Row>
                    <BookIcon />
                    <Project>Project-based Management System</Project>
                </Row>
                <Row>
                    <PeopleIcon />
                    <Members>{`${slot}/${group.members}Members`}</Members>
                </Row>
                <Row>
                    <AccessTimeIcon />
                    <Members>{group.enrollTime}</Members>
                </Row>
                {role === 'Lecturer' ? (
                    <Row>
                        <GroupBtn>View</GroupBtn>
                        <GroupBtn onClick={() => setCreate(true)}>Edit</GroupBtn>
                    </Row>
                ) : (
                    <Row style={{ justifyContent: 'space-between' }}>
                        <AvatarGroup slot={slot} members={group.members} />
                        <JoinBtn onClick={handleJoinBtn} disable={disable} btnStyle={btnStyle}>
                            {btnStyle ? 'Joined' : slot == group.members ? 'Full' : 'Join'}
                        </JoinBtn>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default GroupSection;
