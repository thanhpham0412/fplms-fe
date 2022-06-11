import { useState, useEffect } from 'react';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';

import CreateGroupForm from '../../components/CreateGroupForm';
import GroupSection from '../../components/GroupSection';
import { Banner, Container, GroupList, Title, CreateGroupBtn, GroupLabel } from './style';

const GroupPicking = () => {
    const class_ID = useParams().id;
    const [isCreate, setCreate] = useState(false);
    const [groups, setGroups] = useState([]);
    const [isJoined, setJoin] = useState(false);
    const URL = process.env.REACT_APP_API_URL + `/management/classes/${class_ID}/groups`;
    const TOKEN = localStorage.getItem('token');
    const header = {
        Authorization: TOKEN,
    };
    var role = jwt_decode(TOKEN).role;
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(URL, { headers: header }).then((res) => setGroups(res.data.data));
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
                    {role == 'Lecturer' && (
                        <CreateGroupBtn
                            onClick={() => {
                                setCreate(true);
                            }}
                        >
                            Create Groups
                        </CreateGroupBtn>
                    )}
                </GroupLabel>
                <GroupList>
                    {groups
                        .sort((a, b) => a.number - b.number)
                        .map((group) => {
                            return (
                                <GroupSection
                                    key={group.id}
                                    data={group}
                                    class_ID={class_ID}
                                    role={role}
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
