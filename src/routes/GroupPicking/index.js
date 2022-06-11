import { useState, useEffect } from 'react';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';

import CreateGroupForm from '../../components/CreateGroupForm';
import GroupSection from '../../components/GroupSection';
import { Banner, Container, GroupList, Title, CreateGroupBtn, GroupLabel } from './style';

const GroupPicking = () => {
    const class_ID = useParams();
    const [isCreate, setCreate] = useState(false);
    const [data, setData] = useState([
        {
            id: 1,
            groupNum: 1,
            memberQuantity: 4,
            enrollTime: '2023-06-01 22:50',
        },
        {
            id: 2,
            groupNum: 2,
            memberQuantity: 5,
            enrollTime: '2023-06-01 22:50',
        },
    ]);
    const [isJoined, setJoin] = useState(false);
    const URL = process.env.REACT_APP_API_URL + `/management/classes/${class_ID}/groups`;
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpZW5mcGxtcy5mZUBnbWFpbC5jb20iLCJyb2xlIjoiTGVjdHVyZXIiLCJuYmYiOjE2NTQ3NzczMjQsImV4cCI6MTY1NTM4MjEyNCwiaWF0IjoxNjU0Nzc3MzI0fQ.OMG_xMj91qQ8gYdND4DUyoTwiPWPRvwYv6L__sZCjKI';
    var role = jwt_decode(token).role;
    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(URL, { headers: { Authorization: `${token}` } })
                .then((res) => setData(res.data.data));
            fetchData;
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <CreateGroupForm
                data={data}
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
                    {data
                        .sort((a, b) => a.groupNum - b.groupNum)
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
