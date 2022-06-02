import { useEffect, useState } from 'react';

import { Container, Avatar, HiddenAvatar } from './style';

const AvatarGroup = (props) => {
    const [currentMembers, setCurrentMembers] = useState(props.members);

    useEffect(() => {
        setCurrentMembers(currentMembers);
    }, [currentMembers]);
    return (
        <div>
            <Container>
                <Avatar bg="#BBCCFD"></Avatar>
                <Avatar bg="#BAECCA"></Avatar>
                <Avatar bg="#D0D0D0"></Avatar>
                <HiddenAvatar>+5</HiddenAvatar>
            </Container>
        </div>
    );
};

export default AvatarGroup;
