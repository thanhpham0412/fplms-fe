import { useState, useEffect } from 'react';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useParams, useNavigate } from 'react-router-dom';

import CreateGroupForm from '../../components/CreateGroupForm';
import GroupSection from '../../components/GroupSection';
import { Banner, Container, GroupList, Title, CreateGroupBtn, GroupLabel } from './style';

const GroupPicking = () => {
    const class_ID = useParams().id;
    const [isCreate, setCreate] = useState(false);
    const [groups, setGroups] = useState([]);
    const [isJoined, setJoin] = useState(false);
    const navigate = useNavigate();

    const URL = process.env.REACT_APP_API_URL + `/management/classes/${class_ID}/groups`;
    const UNENROLL = process.env.REACT_APP_API_URL + `/management/classes/${class_ID}/unenroll`;
    // const DELETE_URL = process.env.REACT_APP_API_URL + `/management/classes/${class_ID}/unenroll`;
    const TOKEN = localStorage.getItem('token');
    const header = {
        Authorization: TOKEN,
    };
    var user = jwt_decode(TOKEN);
    useEffect(() => {
        axios
            .get(URL, {
                headers: header,
                params: {
                    userEmail: user.email,
                },
            })
            .then((res) => setGroups(res.data.data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUnenroll = () => {
        axios.delete(UNENROLL, { headers: header }).then(navigate('/class-list'));
    };

    return (
        <>
            <CreateGroupForm
                groups={groups}
                showing={isCreate}
                setCreate={setCreate}
                class_ID={class_ID}
            />
            <Container>
                <Banner />
                <GroupLabel>
                    <Title>groups</Title>
                    {user.role == 'Lecturer' ? (
                        <CreateGroupBtn
                            onClick={() => {
                                setCreate(true);
                            }}
                        >
                            Create Groups
                        </CreateGroupBtn>
                    ) : (
                        <CreateGroupBtn onClick={handleUnenroll}>Unenroll</CreateGroupBtn>
                    )}
                </GroupLabel>
                <GroupList>
                    {groups
                        ?.sort((a, b) => a.number - b.number)
                        .map((group) => {
                            return (
                                <GroupSection
                                    key={group.id}
                                    data={group}
                                    class_ID={class_ID}
                                    {...user}
                                    isJoined={isJoined}
                                    setJoin={setJoin}
                                />
                            );
                        })}
                </GroupList>
            </Container>
        </>
    );
};

export default GroupPicking;
