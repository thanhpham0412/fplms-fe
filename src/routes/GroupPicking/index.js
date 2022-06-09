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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBodW9uZ210c2UxNjExODdAZnB0LmVkdS52biIsInJvbGUiOiJTdHVkZW50IiwibmJmIjoxNjU0NzAwMDA0LCJleHAiOjE2NTUzMDQ4MDQsImlhdCI6MTY1NDcwMDAwNH0.aDVMfHf3LFOw2yHNRW7XvimCA7PuixsFFjrXIMA9P6g';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(URL, { headers: { Authorization: `${token}` } });
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
            fetchData;
        };
        fetchData();
    }, [URL]);
    console.log(data);

    return (
        <>
            <CreateGroupForm showing={isCreate} setCreate={setCreate} />
            <Container>
                <Banner />
                <GroupLabel>
                    <Title>groups</Title>
                    <CreateGroupBtn onClick={() => setCreate(true)}>Create Groups</CreateGroupBtn>
                </GroupLabel>
                <GroupList>
                    <GroupSection />
                    <GroupSection />
                    <GroupSection />
                </GroupList>
            </Container>
        </>
    );
};

export default GroupPicking;
