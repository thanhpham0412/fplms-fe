import { useState } from 'react';

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

const CreateGroupForm = ({ showing, setCreate }) => {
    const [groups, setGroups] = useState(5);
    const [members, setMembers] = useState(4);

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
                        <CreateBtn type="button" onClick={closeForm}>
                            CREATE
                        </CreateBtn>
                    </FormBody>
                </FormContainer>
            </Overlay>
        </>
    );
};

export default CreateGroupForm;
