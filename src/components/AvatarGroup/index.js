import { useEffect, useState } from 'react';

import { Container, Avatar, HiddenAvatar } from './style';

const AvatarGroup = (props) => {
    const [slot, setSlot] = useState(props.members - props.slot);
    var arr = ['#BBCCFD', '#BAECCA', '#D0D0D0'];
    useEffect(() => {
        setSlot(props.members - props.slot);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.slot]);
    const rows = [];
    for (let i = 0; i < props.slot; i++) {
        rows.push(<Avatar key={i} bg={arr[Math.floor(Math.random() * arr.length)]}></Avatar>);
    }
    return (
        <div>
            <Container>
                {rows}
                <HiddenAvatar>+{slot}</HiddenAvatar>
            </Container>
        </div>
    );
};

export default AvatarGroup;
