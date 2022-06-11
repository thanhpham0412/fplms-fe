import { useState, useEffect } from 'react';

import axios from 'axios';

import { ClassSection as Section, CreateClassForm, Button } from '../../components';
import ClassSectionHolder from '../../components/ClassSection/holder';
import { Container, StyledList, StyledInput, ToolBar } from './style';

const ClassList = () => {
    const [classes, setClass] = useState();
    const [loadAnim] = useState(
        new Array(10).fill(ClassSectionHolder).map((Load, i) => <Load key={i} />)
    );
    const [filter, setFilter] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [isCreate, setCreate] = useState(false);

    useEffect(() => {
        const API = process.env.REACT_APP_API_URL + '/management/classes';

        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };

        axios
            .get(API, {
                headers: header,
                params: {
                    userEmail: 'kienfplms.fe@gmail.com',
                },
            })
            .then((res) => {
                console.log(res);
                const data = res.data;
                setClass(data.data);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const open = () => {
        setCreate(true);
    };

    const search = (e) => {
        setFilter(e.target.value);
    };

    const realData = () => {
        return classes
            .filter((classData) => classData.name?.toLowerCase().includes(filter.toLowerCase()))
            .map((classData, index) => (
                <Section
                    key={index}
                    {...classData}
                    className={classData.name.toUpperCase()}
                    lecture="huongntc2@fpt.edu.vn"
                    fullClassName={classData.semester}
                />
            ));
    };

    return (
        <>
            <CreateClassForm showing={isCreate} setCreate={setCreate} setClass={setClass} />
            <Container>
                <ToolBar>
                    <StyledInput
                        type="text"
                        placeholder="Search for class..."
                        spellcheck="false"
                        onChange={search}
                    ></StyledInput>
                    <Button onClick={open}>Create New Class</Button>
                </ToolBar>
                <StyledList>{isLoading ? loadAnim : realData()}</StyledList>
            </Container>
        </>
    );
};

export default ClassList;
