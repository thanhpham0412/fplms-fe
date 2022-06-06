// import { useState } from 'react';
import { useState } from 'react';

import {
    ModalContainer,
    ModalBtn,
    ModalContent,
    ModalHeader,
    ModalInputLabel,
    ModalInputSpace,
    ModalRow,
    ModalColumn,
    ModalTitle,
    ModalName,
    CourseName,
    ModalOverlay,
} from './style';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const Modal = (isOpen) => {
    const [groupNum, setGroupNum] = useState(0);
    const [minMember, setMinMember] = useState(0);
    const [isDisplayed, setOpen] = useState(isOpen.isOpen);
    const handleIncreaseGroup = () => {
        setGroupNum(groupNum + 1);
    };

    const handleDecreaseGroup = () => {
        setGroupNum(groupNum - 1);
    };

    const handleIncreaseMember = () => {
        setMinMember(minMember + 1);
    };

    const handleDecreaseMember = () => {
        setMinMember(minMember - 1);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };
    console.info(isDisplayed);
    return (
        <ModalOverlay isDisplayed={isDisplayed}>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>
                        <ModalName>create new groups</ModalName>
                        <CourseName>SWP391</CourseName>
                    </ModalTitle>
                    <CloseIcon onClick={handleCloseModal} />
                </ModalHeader>
                <ModalContent>
                    <ModalRow>
                        <ModalColumn>
                            <ModalInputLabel>Number of groups</ModalInputLabel>

                            <ModalInputSpace>
                                <ArrowBackIosNewIcon onClick={handleDecreaseGroup} />
                                {groupNum}
                                <ArrowForwardIosIcon onClick={handleIncreaseGroup} />
                            </ModalInputSpace>
                        </ModalColumn>
                    </ModalRow>
                    <ModalRow>
                        <ModalColumn>
                            <ModalInputLabel>Min number of members</ModalInputLabel>
                            <ModalInputSpace>
                                <ArrowBackIosNewIcon onClick={handleDecreaseMember} />
                                {minMember}
                                <ArrowForwardIosIcon onClick={handleIncreaseMember} />
                            </ModalInputSpace>
                        </ModalColumn>
                    </ModalRow>

                    <ModalBtn onClick={handleCloseModal}>Create</ModalBtn>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default Modal;
