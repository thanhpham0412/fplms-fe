import { useState } from 'react';

import axios from 'axios';

import {
    Overlay,
    FormContainer,
    FormHeader,
    FormBody,
    HeaderJumbotron,
    Title,
    SubTitle,
    FormRow,
    FormColumn,
    EditInput,
    SaveButton,
} from './style';

import CloseIcon from '@mui/icons-material/Close';

const EditGroupForm = ({ showing, setCreate, group, setGroup, class_ID }) => {
    const [groupNumEdit, setGroupNumEdit] = useState(group.groupNum);
    const [membersEdit, setMembersEdit] = useState(group.members);
    const [enrollTimeEdit, setEnrollTimeEdit] = useState(group.enrollTime);
    const URL = process.env.REACT_APP_API_URL + `/management/classes/${class_ID}/groups`;
    const TOKEN =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpZW5mcGxtcy5mZUBnbWFpbC5jb20iLCJyb2xlIjoiTGVjdHVyZXIiLCJuYmYiOjE2NTQ3NzczMjQsImV4cCI6MTY1NTM4MjEyNCwiaWF0IjoxNjU0Nzc3MzI0fQ.OMG_xMj91qQ8gYdND4DUyoTwiPWPRvwYv6L__sZCjKI';

    const closeForm = () => {
        setCreate(false);
    };
    const preventPropagation = (e) => {
        e.preventPropagation();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .put(
                URL,
                {
                    enrollTime: enrollTimeEdit,
                    id: group.id,
                    memberQuanity: membersEdit,
                    number: groupNumEdit,
                },
                { headers: { Authorization: `${TOKEN}` } }
            )
            .then(() => {
                setGroup({
                    id: group.id,
                    enrollTime: enrollTimeEdit,
                    members: membersEdit,
                    groupNum: groupNumEdit,
                });
            });

        closeForm();
    };

    return (
        <>
            <Overlay isDisplay={showing}>
                <FormContainer onclick={preventPropagation}>
                    <FormHeader>
                        <HeaderJumbotron>
                            <Title>Edit Group</Title>
                            <SubTitle>GROUP {group.groupNum}</SubTitle>
                        </HeaderJumbotron>
                        <CloseIcon sx={{ fontSize: '2rem' }} onClick={closeForm} />
                    </FormHeader>
                    <FormBody onSubmit={handleSubmit}>
                        <FormRow>
                            <FormColumn>
                                <small>Group name</small>
                                <EditInput
                                    defaultValue={`GROUP ${groupNumEdit}`}
                                    onChange={(e) => setGroupNumEdit(e.target.value)}
                                />
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Group Project</small>
                                <EditInput defaultValue={'Project-based Learning'} />
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Members</small>
                                <EditInput
                                    defaultValue={membersEdit}
                                    onChange={(e) => setMembersEdit(e.target.value)}
                                />
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Closing Tme</small>
                                <EditInput
                                    type={'text'}
                                    defaultValue={enrollTimeEdit}
                                    onChange={(e) => setEnrollTimeEdit(e.target.value)}
                                />
                            </FormColumn>
                        </FormRow>
                        <SaveButton type="submit">SAVE</SaveButton>
                    </FormBody>
                </FormContainer>
            </Overlay>
        </>
    );
};

export default EditGroupForm;
