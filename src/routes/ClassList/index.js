import { useState } from 'react';

import { ClassSection as Section, CreateClass, CreateClassForm } from '../../components';
import { Container, Hero, Title, StyledList } from './style';

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
                <Hero />
                <Title>CLASS LIST</Title>
                <StyledList>
                    <CreateClass setCreate={setCreate} />
                    {classes.map((classData, index) => (
                        <Section key={index} {...classData} />
                    ))}
                </StyledList>
            </Container>
        </>
    );
};

export default ClassList;
