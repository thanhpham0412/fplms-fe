import { useEffect, useState } from 'react';

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
    const myDate = group.enrollTime.split(' ');
    const [groupNumEdit, setGroupNumEdit] = useState(group.groupNum);
    const [membersEdit, setMembersEdit] = useState(group.members);
    const [date, setDate] = useState(myDate[0]);
    const [time, setTime] = useState(myDate[1]);
    const [enrollTime, setEnrollTime] = useState(group.enrollTime);
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
        console.log(enrollTime);
        await axios
            .put(
                URL,
                {
                    enrollTime: enrollTime,
                    id: group.id,
                    memberQuanity: membersEdit,
                    number: groupNumEdit,
                },
                { headers: { Authorization: `${TOKEN}` } }
            )
            .then(() => {
                setGroup({
                    id: group.id,
                    enrollTime: enrollTime,
                    members: membersEdit,
                    groupNum: groupNumEdit,
                });
                closeForm();
            })
            .catch(() => {
                setGroup({
                    id: group.id,
                    enrollTime: enrollTime,
                    members: membersEdit,
                    groupNum: groupNumEdit,
                });
                closeForm();
            });
    };

    useEffect(() => {
        setEnrollTime(date + ' ' + time);
    }, [date, time]);

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
                                <small>Group number</small>
                                <EditInput
                                    defaultValue={groupNumEdit}
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
                                    type={'date'}
                                    defaultValue={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Closing Tme</small>
                                <EditInput
                                    type={'time'}
                                    defaultValue={time}
                                    onChange={(e) => setTime(e.target.value)}
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
