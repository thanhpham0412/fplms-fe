import { useEffect, useState } from 'react';

import AvatarGroup from '../AvatarGroup';
import Modal from '../Modal';
import { GContainer, GHeader, GMember, GProject, GFooter, GButton, GContent, GText } from './style';

const GroupContent = (props) => {
    const [currentMembers, setCurrentMembers] = useState(props.currentMembers);
    const [isFull, setIsFull] = useState(false);
    const [isOpen, setOpen] = useState(false);

    const handleJoinGroup = () => {
        if (currentMembers < props.maxMembers) {
            setCurrentMembers(currentMembers + 1);
        }
    };

    useEffect(() => {
        if (currentMembers < props.maxMembers) {
            setIsFull(false);
        } else {
            setIsFull(true);
        }
    }, [currentMembers, props.maxMembers]);
    return (
        <>
            <GContainer>
                <GHeader>GROUP 1</GHeader>
                <GProject>PROJECT BASE LMS</GProject>
                <GContent>
                    <GText>Number of Students: {props.maxMembers}</GText>
                    <GText>Available: {props.maxMembers - currentMembers}</GText>
                </GContent>
                <GMember>{`${currentMembers}/${props.maxMembers} Members`}</GMember>
                <GFooter>
                    {props.role === 'lecturer' ? (
                        <>
                            <GButton bg={'#F44887'}>View</GButton>
                            <GButton bg={'#F44887'} onClick={() => setOpen(true)}>
                                Edit
                            </GButton>
                        </>
                    ) : (
                        <>
                            <AvatarGroup members={currentMembers} />
                            {isFull ? (
                                <GButton bg={'#F44887'} onClick={handleJoinGroup}>
                                    Full
                                </GButton>
                            ) : (
                                <GButton bg={'#7799FA'} onClick={handleJoinGroup}>
                                    Join
                                </GButton>
                            )}
                        </>
                    )}
                </GFooter>
            </GContainer>
            <Modal isOpen={isOpen} />
        </>
    );
};

export default GroupContent;
