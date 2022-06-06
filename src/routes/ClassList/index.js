import { useState } from 'react';

import { ClassSection as Section, CreateClassForm } from '../../components';
import { Container, StyledList, StyledInput } from './style';

const ClassList = () => {
    const [classes] = useState(
        new Array(21).fill({
            className: 'SWP391',
            fullClassName: 'Software Development Project',
            lecture: 'huongntc2@fpt.edu.vn',
        })
    );

    const [isCreate, setCreate] = useState(false);

    return (
        <>
            <CreateClassForm showing={isCreate} setCreate={setCreate} />
            <Container>
                <StyledInput
                    type="text"
                    placeholder="Search for class..."
                    spellcheck="false"
                ></StyledInput>
                <StyledList>
                    {classes.map((classData, index) => (
                        <Section key={index} {...classData} />
                    ))}
                </StyledList>
            </Container>
        </>
    );
};

export default ClassList;
