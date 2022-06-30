/* eslint-disable prettier/prettier */

/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import axios from 'axios';

import { ClassSection as Section, CreateClassForm, Button } from '../../components';
import ClassSectionHolder from '../../components/ClassSection/holder';
import { getTokenInfo } from '../../utils/account';
import { get } from '../../utils/request';
import { Container, StyledList, StyledInput, ToolBar } from './style';

const ClassList = () => {
    const [classList, setList] = useState(null);
    const [loadHolder] = useState(
        new Array(10).fill(ClassSectionHolder).map((Load, i) => <Load key={i} />)
    );
    const [filter, setFilter] = useState('');
    const [isCreate, setCreate] = useState(false);
    const [searchClass, setSearch] = useState('');
    const [subjects, setSubjects] = useState([]);

    const user = getTokenInfo();

    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        const API_LECTURER = process.env.REACT_APP_API_URL + '/classes';
        const API_STUDENT = process.env.REACT_APP_API_URL + `/classes/student`;
        const CLASS_API = user.role == 'Lecturer' ? API_LECTURER : API_STUDENT;

        const subs = get('/subjects');
        const list = axios.get(CLASS_API, {
            headers: header,
            params: {
                search: searchClass,
            },
        });

        Promise.all([subs, list]).then(([subs, list]) => {
            console.log('done');
            setSubjects(
                subs?.data.data.reduce((pre, cur) => {
                    pre[cur.id] = cur.name;
                    return pre;
                }, [])
            );
            setList(list.data.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const open = () => {
        setCreate(true);
    };

    const search = (e) => {
        setFilter(e.target.value);
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        //asd
    };

    return (
        <>
            <CreateClassForm showing={isCreate} setCreate={setCreate} setClass={setList} />
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
                <StyledList>
                    {Array.isArray(classList)
                        ? classList.map((item) => (
                              <Section
                                  key={item.id}
                                  name={item.name}
                                  lecture={
                                      item.lecturerDto
                                          ? `${item.lecturerDto.name} - ${item.lecturerDto.email}`
                                          : item.enrollKey
                                  }
                                  subjectId={subjects[item.subjectId]}
                                  semesterCode={item.semesterCode}
                                  id={item.id}
                                  join={item.join}
                              />
                          ))
                        : loadHolder}
                </StyledList>
            </Container>
        </>
    );
};

export default ClassList;
