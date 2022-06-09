import { useState } from 'react';

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

const EditGroupForm = ({ showing, setCreate, data, setGroup }) => {
    const [groupEdit, setGroupEdit] = useState(data.group);
    const [projectEdit, setProjectEdit] = useState(data.project);
    const [slot, setSlot] = useState(data.members);
    const [dateEdit, setDateEdit] = useState(data.date);

    const closeForm = () => {
        setCreate(false);
    };
    const preventPropagation = (e) => {
        e.preventPropagation();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setGroup({
            groupNum: groupEdit,
            project: projectEdit,
            members: slot,
            enrollTime: dateEdit,
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
                            <SubTitle>{data.group}</SubTitle>
                        </HeaderJumbotron>
                        <CloseIcon sx={{ fontSize: '2rem' }} onClick={closeForm} />
                    </FormHeader>
                    <FormBody onSubmit={handleSubmit}>
                        <FormRow>
                            <FormColumn>
                                <small>Group name</small>
                                <EditInput
                                    defaultValue={groupEdit}
                                    onChange={(e) => setGroupEdit(e.target.value)}
                                />
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Group Project</small>
                                <EditInput
                                    defaultValue={projectEdit}
                                    onChange={(e) => setProjectEdit(e.target.value)}
                                />
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Members</small>
                                <EditInput
                                    defaultValue={slot}
                                    onChange={(e) => setSlot(e.target.value)}
                                />
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Closing Tme</small>
                                <EditInput
                                    type={'text'}
                                    defaultValue={dateEdit}
                                    onChange={(e) => setDateEdit(e.target.value)}
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
