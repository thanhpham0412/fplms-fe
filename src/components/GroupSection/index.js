import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { error } from '../../utils/toaster';
import AvatarGroup from '../AvatarGroup';
import EditGroupForm from '../EditGroupForm';
import { Container, Header, Row, Project, Members, GroupBtn, JoinBtn } from './style';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';

const GroupSection = ({ data, class_ID, role, isJoined, setJoin }) => {
    const group_Id = data.id;
    const [isCreate, setCreate] = useState(false);
    const [disable, setDisable] = useState(false);
    const [btnStyle, setBtnStyle] = useState(false);
    const [slot, setSlot] = useState(data.currentNumber);
    const [group, setGroup] = useState(data);
    const currentDate = new Date();
    const navigate = useNavigate();

    const TOKEN = localStorage.getItem('token');
    const URL =
        process.env.REACT_APP_API_URL + `/management/classes/${class_ID}/groups/${group_Id}/join`;
    const header = {
        Authorization: `${TOKEN}`,
    };

    const handleJoinBtn = async () => {
        await axios.post(URL, { groupId: group_Id }, { headers: header }).then((res) => {
            if (res.data.code == 200) {
                setJoin(true);
                setBtnStyle(true);
                setSlot((prev) => prev + 1);
                navigate(`/group-view/${group_Id}`);
            } else {
                error(`An error occured!`);
            }
        });
    };
    //Disable Join button base on slot an time
    useEffect(() => {
        if (slot == group.memberQuantity) {
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
                <Header>GROUP {group.number}</Header>
                <Row>
                    <BookIcon />
                    <Project>Project-based Management System</Project>
                </Row>
                <Row>
                    <PeopleIcon />
                    <Members>{`${slot}/${group.memberQuantity}Members`}</Members>
                </Row>
                <Row>
                    <AccessTimeIcon />
                    <Members>{group.enrollTime.split('.')[0]}</Members>
                </Row>
                {role === 'Lecturer' ? (
                    <Row>
                        <GroupBtn
                            onClick={() => {
                                navigate(`/group-view/${group.id}`);
                            }}
                        >
                            View
                        </GroupBtn>
                        <GroupBtn onClick={() => setCreate(true)}>Edit</GroupBtn>
                    </Row>
                ) : (
                    <Row style={{ justifyContent: 'space-between' }}>
                        <AvatarGroup slot={slot} members={group.memberQuantity} />
                        <JoinBtn onClick={handleJoinBtn} disable={disable} btnStyle={btnStyle}>
                            {slot == group.memberQuantity ? 'Full' : 'Join'}
                        </JoinBtn>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default GroupSection;
