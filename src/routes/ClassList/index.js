import { useState, useEffect } from 'react';

import axios from 'axios';

import { ClassSection as Section, CreateClassForm, Button } from '../../components';
import ClassSectionHolder from '../../components/ClassSection/holder';
import { getTokenInfo } from '../../utils/account';
import { get } from '../../utils/request';
import { Container, StyledList, StyledInput, ToolBar } from './style';

const ClassList = () => {
    const [classes, setClass] = useState();
    const [loadAnim] = useState(
        new Array(10).fill(ClassSectionHolder).map((Load, i) => <Load key={i} />)
    );
    const [filter, setFilter] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [isCreate, setCreate] = useState(false);
    const [searchClass, setSearch] = useState('');
    const [subjects, setSubjects] = useState([]);

    const user = getTokenInfo();

    const API_LECTURER = process.env.REACT_APP_API_URL + '/management/classes';
    const API_STUDENT = process.env.REACT_APP_API_URL + `/management/classes/student`;
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        if (user.role == 'Lecturer') {
            axios
                .get(
                    API_LECTURER,
                    {
                        headers: header,
                    },
                    {
                        userEmail: user.email,
                    }
                )
                .then((res) => {
                    const data = res.data;
                    setClass(data.data);
                    setLoading(false);
                });
        } else {
            axios
                .get(
                    API_STUDENT,
                    {
                        headers: header,
                        params: {
                            search: searchClass,
                        },
                    },
                    {
                        userEmail: user.email,
                    }
                )
                .then((res) => {
                    const data = res.data;
                    console.log(data);
                    setClass(data.data);
                    setLoading(false);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            axios
                .get(
                    API_STUDENT,
                    {
                        headers: header,
                        params: {
                            search: searchClass,
                        },
                    },
                    {
                        userEmail: user.email,
                    }
                )
                .then((res) => {
                    const data = res.data;
                    setClass(data.data);
                    setLoading(false);
                });
        }
    };

    const open = () => {
        setCreate(true);
    };

    const search = (e) => {
        setFilter(e.target.value);
        setSearch(e.target.value);
    };

    const realData = () => {
        return classes
            .filter((classData) => classData.name?.toLowerCase().includes(filter.toLowerCase()))
            .map((classData, index) => (
                <Section
                    key={index}
                    {...classData}
                    subjectsCode={subjects}
                    className={classData.name.toUpperCase()}
                    lecture={classData?.lecturerDto?.email || user.email}
                    fullClassName={classData.semester}
                    subjectId={classData.subjectId}
                    user={user}
                    id={classData.id}
                />
            ));
    };

    useEffect(() => {
        get('/management/subjects', {}).then((res) => {
            const data = res.data.data;
            const sub = data.map((subject) => ({
                value: subject.id,
                content: subject.name,
            }));
            setSubjects(sub);
        });
    }, []);

    return (
        <>
            <CreateClassForm
                showing={isCreate}
                setCreate={setCreate}
                setClass={setClass}
                subjects={subjects}
            />
            <Container>
                <ToolBar>
                    <StyledInput
                        type="text"
                        placeholder="Search for class..."
                        spellcheck="false"
                        onChange={search}
                        onKeyUp={handleSearch}
                    ></StyledInput>
                    {user.role == 'Lecturer' && <Button onClick={open}>Create New Class</Button>}
                </ToolBar>
                <StyledList>{isLoading ? loadAnim : realData()}</StyledList>
            </Container>
        </>
    );
};

export default ClassList;
