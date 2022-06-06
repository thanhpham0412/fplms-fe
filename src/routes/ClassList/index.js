import { useState, useEffect } from 'react';

import { ClassSection as Section, CreateClassForm } from '../../components';
import { Container, StyledList, StyledInput } from './style';

const ClassList = () => {
    const [classes, setClass] = useState(
        new Array(21).fill({
            className: 'SWP391',
            fullClassName: 'Software Development Project',
            lecture: 'huongntc2@fpt.edu.vn',
        })
    );

    useEffect(() => {
        setClass((prev) => prev.map((c) => ({ isEnroll: Math.random() < 0.2, ...c })));
        setClass((prev) => prev.sort((c) => (!c.isEnroll ? 1 : -1)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
