import { useState } from 'react';

import axios from 'axios';

import { Overlay } from '../index';
import {
    FormContainer,
    FormHeader,
    FormBody,
    HeaderJumbotron,
    Title,
    SubTitle,
    FormRow,
    FormColumn,
    FormInput,
    CreateBtn,
} from './style';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const CreateGroupForm = ({ showing, setCreate, class_ID }) => {
    const [groups, setGroups] = useState(5);
    const [members, setMembers] = useState(4);
    const URL = process.env.REACT_APP_API_URL + `/management/classes/112/groups`;
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpZW5mcGxtcy5mZUBnbWFpbC5jb20iLCJyb2xlIjoiTGVjdHVyZXIiLCJuYmYiOjE2NTQ3NzczMjQsImV4cCI6MTY1NTM4MjEyNCwiaWF0IjoxNjU0Nzc3MzI0fQ.OMG_xMj91qQ8gYdND4DUyoTwiPWPRvwYv6L__sZCjKI';
    const handleCreateBtn = () => {
        axios
            .post(
                URL,
                {
                    classId: class_ID,
                    enrollTime: '2022-06-01 23:22:22.123',
                    groupQuantity: groups,
                    memberQuantity: members,
                },
                { headers: { Authorization: `${token}` } }
            )
            .then(() => {
                closeForm();
            });
    };

    const closeForm = () => {
        setCreate(false);
    };

    const preventPropagation = (e) => {
        e.preventPropagation();
    };

    return (
        <>
            <Overlay showing={showing}>
                <FormContainer onclick={preventPropagation}>
                    <FormHeader>
                        <HeaderJumbotron>
                            <Title>Create New Group</Title>
                            <SubTitle>SE1633</SubTitle>
                        </HeaderJumbotron>
                        <CloseIcon sx={{ fontSize: '2rem' }} onClick={closeForm} />
                    </FormHeader>
                    <FormBody>
                        <FormRow>
                            <FormColumn>
                                <small>Number of groups</small>

                                <FormInput>
                                    <ArrowBackIosIcon onClick={() => setGroups(groups - 1)} />
                                    {groups}
                                    <ArrowForwardIosIcon onClick={() => setGroups(groups + 1)} />
                                </FormInput>
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Min number of members</small>

                                <FormInput>
                                    <ArrowBackIosIcon onClick={() => setMembers(members - 1)} />
                                    {members}
                                    <ArrowForwardIosIcon onClick={() => setMembers(members + 1)} />
                                </FormInput>
                            </FormColumn>
                        </FormRow>
                        <CreateBtn type="button" onClick={handleCreateBtn}>
                            CREATE
                        </CreateBtn>
                    </FormBody>
                </FormContainer>
            </Overlay>
        </>
    );
};

export default CreateGroupForm;
