import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { getTokenInfo } from '../../utils/account';
import { error, success } from '../../utils/toaster';
import AvatarGroup from '../AvatarGroup';
import ConfirmModal from '../ConfirmModal';
import EditGroupForm from '../EditGroupForm';
import {
    Container,
    Header,
    Row,
    Project,
    Members,
    GroupBtn,
    JoinBtn,
    Dropdown,
    DropdownMenu,
} from './style';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookIcon from '@mui/icons-material/Book';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';

const GroupSection = ({ data, class_ID, role, email, isJoined, setJoin, setRefresh }) => {
    const { id } = data;

    const [isCreate, setCreate] = useState(false);
    const [disable, setDisable] = useState(false);
    const [btnStyle, setBtnStyle] = useState(false);
    const [slot, setSlot] = useState(data.currentNumber);
    const [isOpen, setIsOpen] = useState(false);
    const [group] = useState(data);
    const currentDate = new Date();

    const navigate = useNavigate();
    const user = getTokenInfo();

    const TOKEN = localStorage.getItem('token');
    const URL = process.env.REACT_APP_API_URL + `/classes/${class_ID}/groups/${id}/join`;
    const URL_DELETE = process.env.REACT_APP_API_URL + `/classes/${class_ID}/groups/${group.id}`;
    const URL_DISABLE =
        process.env.REACT_APP_API_URL + `/classes/${class_ID}/groups/${group.id}/disable`;
    const header = {
        Authorization: `${TOKEN}`,
    };

    useEffect(() => {
        if (slot == group.memberQuantity) {
            setDisable(true);
        } else if (isJoined || currentDate > new Date(group.enrollTime)) {
            setDisable(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slot, isJoined]);

    const handleJoinBtn = async () => {
        await axios.post(URL, { groupId: id }, { headers: header }).then((res) => {
            if (res.data.code == 200) {
                setJoin(true);
                setBtnStyle(true);
                setSlot((prev) => prev + 1);
                navigate(`/class/${class_ID}/group/${id}`);
            } else {
                error(`An error occured!`);
            }
        });
    };

    const handleRemoveBtn = () => {
        if (group.currentNumber === 0) {
            axios
                .delete(URL_DELETE, { headers: header })
                .then((res) => {
                    if (res.data.code == 200) {
                        success(`Remove group${group.number} successfully!`);
                        setIsOpen(false);
                    } else error(`${res.data.message}`);
                })
                .finally(() => {
                    setRefresh((prev) => prev - 1);
                });
        }
        if (group.currentNumber > 0) {
            axios
                .put(URL_DISABLE, { userEmail: email }, { headers: header })
                .then((res) => {
                    if (res.data.code == 200) {
                        success(`Disable group${group.number} successfully!`);
                        setIsOpen(false);
                    } else error(`${res.data.message}`);
                })
                .finally(() => {
                    setRefresh((prev) => prev - 1);
                });
            error(`Group ${group.number} is having ${group.currentNumber} member(s)!`);
        }
    };

    return (
        <>
            <EditGroupForm
                showing={isCreate}
                group={group}
                setCreate={setCreate}
                class_ID={class_ID}
                email={email}
                setRefresh={setRefresh}
            />
            <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} action={handleRemoveBtn} />
            <Container>
                <Header style={{ justifyContent: 'space-between' }}>
                    <div>GROUP {group.number}</div>
                    {user.role === 'Lecturer' && (
                        <Dropdown>
                            <button className="sub-option" onClick={(e) => e.stopPropagation}>
                                <MoreVertIcon />
                            </button>
                            <DropdownMenu className="dropdown-menu">
                                <DeleteIcon onClick={() => setIsOpen(true)} />
                                <EditIcon onClick={() => setCreate(true)} />
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </Header>
                <Row>
                    <BookIcon />
                    <Project style={{ color: group?.projectDTO?.name ? '#8B8B8B' : '#F776A5' }}>
                        {group?.projectDTO?.name || `UNASSIGNED`}
                    </Project>
                </Row>
                <Row>
                    <PeopleIcon />
                    <Members>{`${slot}/${group.memberQuantity}Members`}</Members>
                </Row>
                <Row>
                    <AccessTimeIcon />
                    <Members>{group.enrollTime && group.enrollTime.split('.')[0]}</Members>
                </Row>
                {role === 'Lecturer' ? (
                    <Row>
                        <GroupBtn
                            onClick={() => {
                                navigate(`/class/${class_ID}/group/${group.id}`);
                            }}
                        >
                            View
                        </GroupBtn>
                    </Row>
                ) : (
                    <Row style={{ justifyContent: 'space-between' }}>
                        <AvatarGroup slot={slot} members={group.memberQuantity} />
                        <JoinBtn onClick={handleJoinBtn} disable={disable} btnStyle={btnStyle}>
                            {slot == group.memberQuantity ? 'Full' : disable ? 'Closed' : 'Join'}
                        </JoinBtn>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default GroupSection;
