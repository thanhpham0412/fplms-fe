import { useState } from 'react';

import { ClassSection as Section } from '../../components';
import { Container, Hero, Title, StyledList } from './style';

const ClassList = () => {
    const [classes] = useState(
        new Array(7).fill({
            className: 'SWP391',
            fullClassName: 'Software development project',
            lecture: 'HuongNTC2@fpt.edu.vn',
        })
    );

    return (
        <Container>
            <Hero />
            <Title>CLASS LIST</Title>
            <StyledList>
                {classes.map((classData, index) => (
                    <Section key={index} {...classData} />
                ))}
            </StyledList>
        </Container>
    );
};

export default ClassList;
