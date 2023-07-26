import { useEffect, useState } from 'react';

import axios from 'axios';

import { error, success } from '../../utils/toaster';
import ButtonLoader from '../ButtonLoader';
import Overlay from '../Overlay';
import {
    FormContainer,
    FormHeader,
    FormBody,
    HeaderJumbotron,
    Title,
    SubTitle,
    FormRow,
    FormColumn,
    EditInput,
    StyledButton,
} from './style';

import CloseIcon from '@mui/icons-material/Close';

const EditGroupForm = ({ showing, setCreate, group, class_ID, setRefresh }) => {
    const myDate = group.enrollTime.split('T');
    const [groupNumEdit, setGroupNumEdit] = useState(group.number);
    const [membersEdit, setMembersEdit] = useState(group.memberQuantity);
    const [date, setDate] = useState(myDate[0]);
    const [time, setTime] = useState(myDate[1].split("Z")[0]);
    const [enrollTime, setEnrollTime] = useState(group.enrollTime);
    const [isLoading, setLoading] = useState(false);

    const [errorForm, setErrorForm] = useState({ numErr: '', memberQuantityErr: '', closingDateErr: "" });

    const URL = process.env.REACT_APP_API_URL + `/classes/${class_ID}/groups`;
    const TOKEN = localStorage.getItem('token');
    const header = {
        Authorization: `bearer ${TOKEN}`,
    };

    const closeForm = () => {
        setCreate(false);
    };

    const handleSaveBtn = () => {
        setLoading(true);
        axios
            .put(
                URL,
                {
                    disable: false,
                    enrollTime: enrollTime,
                    id: group.id,
                    memberQuantity: membersEdit,
                    number: groupNumEdit,
                },
                { headers: header }
            )
            .then((res) => {
                if (res.data.code == 200) {
                    success(`Edit group ${group.number} successfully`);
                    setRefresh((prev) => prev + 1);
                } else {
                    error(res.data.message);
                    setRefresh((prev) => prev + 1);
                }
            })
            .catch(() => {
                error(`An error occured`);
            })
            .finally(() => {
                closeForm();
                setLoading(false);
            });
    };

    const validateClosing = (date) => {
        const today = new Date();

        return today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate() || date > today;
    }

    useEffect(() => {
        setEnrollTime(date + 'T' + time + "Z");
    }, [date, time]);

    const renderError = (error) => {
        return <span style={{ color: 'red', fontSize: '10px' }}>{error}</span>;
    };
    return (
        <>
            <Overlay isOpen={showing} closeFn={setCreate}>
                <FormContainer>
                    <FormHeader>
                        <HeaderJumbotron>
                            <Title>Edit Group</Title>
                            <SubTitle>GROUP {group.number}</SubTitle>
                        </HeaderJumbotron>
                        <CloseIcon sx={{ fontSize: '2rem' }} onClick={closeForm} />
                    </FormHeader>
                    <FormBody>
                        <FormRow>
                            <FormColumn>
                                <small>Group number</small>
                                <EditInput
                                    defaultValue={groupNumEdit}
                                    onChange={(e) => {
                                        setGroupNumEdit(e.target.value);
                                        setErrorForm((prev) => ({
                                            ...prev,
                                            numErr: e.target.value < 1 ? 'Group num must be greater or equal 1!': "",
                                        }))
                                    }}
                                />
                                  {renderError(errorForm.numErr)}
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Members</small>
                                <EditInput
                                    defaultValue={membersEdit}
                                    type='number'
                                    min={1}
                                    onChange={(e) => {setMembersEdit(e.target.value); 
                                        setErrorForm((prev) => ({
                                            ...prev,
                                            memberQuantityErr: e.target.value < 1 ? 'Number of students in group must be greater or equal 1!': "",
                                        }))
                                    }}
                                />
                                  {renderError(errorForm.memberQuantityErr)}
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Closing date</small>
                                <EditInput
                                    type={'date'}
                                    defaultValue={date}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                        setErrorForm({
                                            ...errorForm,
                                            closingDateErr: validateClosing(new Date(e.target.value)) ? "" : "Closing date must be today or the future"
                                        })
                                    }}
                                />
                                 {renderError(errorForm.closingDateErr)}
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
                        <FormRow justifyContent={'center'}>
                            
                            <StyledButton isLoading={isLoading} onClick={handleSaveBtn} disabled={errorForm.memberQuantityErr !== "" || errorForm.numErr !== "" || errorForm.closingDateErr !== ""}>
                                <ButtonLoader isLoading={isLoading} />
                                <span>SAVE</span>
                            </StyledButton>
                        </FormRow>
                    </FormBody>
                </FormContainer>
            </Overlay>
        </>
    );
};

export default EditGroupForm;
