// import SideBar from '../../components/Sidebar';
import { useState } from 'react';

import CreateGroupForm from '../../components/CreateGroupForm';
import GroupSection from '../../components/GroupSection';
import { Banner, Container, GroupList, Title, CreateGroupBtn, GroupLabel } from './style';

const GroupPicking = () => {
    const [isCreate, setCreate] = useState(false);

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
