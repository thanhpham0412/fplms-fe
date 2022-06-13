import { useEffect, useState } from 'react';

import axios from 'axios';

import { error, success } from '../../utils/toaster';
import ButtonLoader from '../ButtonLoader';
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
    const [groupNumEdit, setGroupNumEdit] = useState(group.number);
    const [membersEdit, setMembersEdit] = useState(group.memberQuantity);
    const [date, setDate] = useState(myDate[0]);
    const [time, setTime] = useState(myDate[1]);
    const [enrollTime, setEnrollTime] = useState(group.enrollTime);
    const [isLoading, setLoading] = useState(false);

    const URL = process.env.REACT_APP_API_URL + `/management/classes/${class_ID}/groups`;
    const TOKEN = localStorage.getItem('token');
    const header = {
        Authorization: TOKEN,
    };
    const closeForm = () => {
        setCreate(false);
    };
    const preventPropagation = (e) => {
        e.preventPropagation();
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        await axios
            .put(
                URL,
                {
                    enrollTime: enrollTime,
                    id: group.id,
                    memberQuantity: membersEdit,
                    number: groupNumEdit,
                    projectDTIO: {},
                },
                { headers: header }
            )
            .then((res) => {
                if (res.data.code == 200) {
                    setGroup({
                        id: group.id,
                        enrollTime: enrollTime,
                        members: membersEdit,
                        groupNum: groupNumEdit,
                    });
                    success(`Edit group ${group.number} successfully`);
                } else {
                    error(res.data.message);
                }
            })
            .catch(() => {
                error(`An error occured`);
            })
            .finally(() => {
                setLoading(false);
                closeForm;
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
                            <SubTitle>GROUP {group.number}</SubTitle>
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
                                <small>Closing date</small>
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
                                    onChange={(e) => setTime(e.target.value + ':00.000')}
                                />
                            </FormColumn>
                        </FormRow>
                        <SaveButton isLoading={isLoading} type="submit">
                            <ButtonLoader isLoading={isLoading} />
                            <span>SAVE</span>
                        </SaveButton>
                    </FormBody>
                </FormContainer>
            </Overlay>
        </>
    );
};

export default EditGroupForm;
