import { useState } from 'react';

import { ClassSection as Section, CreateClassForm, Selection } from '../../components';
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

    const options = [
        {
            content: 'options 1',
            value: 1,
        },
        {
            content: 'options 2',
            value: 2,
        },
        {
            content: 'options 3',
            value: 3,
        },
        {
            content: 'options 4',
            value: 4,
        },
    ];

    return (
        <>
            <CreateClassForm showing={isCreate} setCreate={setCreate} />
            <Container>
                <Selection options={options} />
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
