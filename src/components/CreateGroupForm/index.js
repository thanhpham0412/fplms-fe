import { useEffect, useState } from 'react';

import axios from 'axios';

import { error, success } from '../../utils/toaster';
import ButtonLoader from '../ButtonLoader';
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
    TimeInput,
} from './style';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const CreateGroupForm = ({ showing, setCreate, class_ID }) => {
    const [groups, setGroups] = useState(1);
    const [members, setMembers] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [enrollTime, setEnrollTime] = useState('');
    const [isLoading, setLoading] = useState(false);

    const URL = process.env.REACT_APP_API_URL + `/management/classes/${class_ID}/groups`;
    const TOKEN = localStorage.getItem('token');
    const header = {
        Authorization: TOKEN,
    };
    const handleCreateBtn = () => {
        setLoading(true);
        axios
            .post(
                URL,
                {
                    classId: class_ID,
                    enrollTime: enrollTime,
                    groupQuantity: groups,
                    memberQuantity: members,
                },
                { headers: header }
            )
            .then((res) => {
                if (res.data.code == 200) {
                    success(`Create ${groups} group(s) successfully!`);
                } else {
                    error(res.data.message);
                }
            })
            .catch(() => {
                error(`An error occured!`);
            })
            .finally(() => {
                setLoading(false);
                closeForm();
            });
    };

    const closeForm = () => {
        setCreate(false);
    };

    const preventPropagation = (e) => {
        e.preventPropagation();
    };

    useEffect(() => {
        setEnrollTime(date + ' ' + time);
    }, [date, time]);

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
                        <FormRow>
                            <FormColumn>
                                <small>Closing date</small>
                                <TimeInput
                                    type={'date'}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Closing time</small>
                                <TimeInput
                                    type={'time'}
                                    onChange={(e) => setTime(e.target.value + ':00.000')}
                                    defaultValue="00:00"
                                />
                            </FormColumn>
                        </FormRow>
                        <CreateBtn type="button" onClick={handleCreateBtn} isLoading={isLoading}>
                            <ButtonLoader isLoading={isLoading} />
                            <span>CREATE</span>
                        </CreateBtn>
                    </FormBody>
                </FormContainer>
            </Overlay>
        </>
    );
};

export default CreateGroupForm;
