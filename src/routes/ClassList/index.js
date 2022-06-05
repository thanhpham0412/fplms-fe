import { useState } from 'react';

import { ClassSection as Section, CreateClassForm } from '../../components';
import { Container, StyledList } from './style';

const ClassList = () => {
    const [classes] = useState(
        new Array(21).fill({
            className: 'SWP391',
            fullClassName: 'Software development project',
            lecture: 'HuongNTC2@fpt.edu.vn',
        })
    );

    const [isCreate, setCreate] = useState(false);

    return (
        <>
            <CreateClassForm showing={isCreate} setCreate={setCreate} />
            <Container>
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
