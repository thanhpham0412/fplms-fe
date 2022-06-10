// import SideBar from '../../components/Sidebar';
import { useEffect, useState } from 'react';

import axios from 'axios';

import CreateGroupForm from '../../components/CreateGroupForm';
import GroupSection from '../../components/GroupSection';
import { Banner, Container, GroupList, Title, CreateGroupBtn, GroupLabel } from './style';

const GroupPicking = () => {
    const [isCreate, setCreate] = useState(false);
    const [data, setData] = useState([]);
    const URL = process.env.REACT_APP_API_URL + '/management/classes/1/groups';
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpZW5mcGxtcy5mZUBnbWFpbC5jb20iLCJyb2xlIjoiTGVjdHVyZXIiLCJuYmYiOjE2NTQ3NzczMjQsImV4cCI6MTY1NTM4MjEyNCwiaWF0IjoxNjU0Nzc3MzI0fQ.OMG_xMj91qQ8gYdND4DUyoTwiPWPRvwYv6L__sZCjKI';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(URL, { headers: { Authorization: `${token}` } });
                setData(res.data.data);
            } catch (error) {
                console.log(error);
            }
            fetchData;
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <CreateGroupForm showing={isCreate} setCreate={setCreate} class_ID={1} />
            <Container>
                <Banner />
                <GroupLabel>
                    <Title>groups</Title>
                    <CreateGroupBtn onClick={() => setCreate(true)}>Create Groups</CreateGroupBtn>
                </GroupLabel>
                <GroupList>
                    {data?.map((group) => {
                        return <GroupSection key={group.id} data={group} />;
                    })}
                </GroupList>
            </Container>
        </>
    );
};

export default GroupPicking;
