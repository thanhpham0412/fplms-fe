/* eslint-disable prettier/prettier */

/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import axios from 'axios';

import { ClassSection as Section, CreateClassForm, Button, Selection, Overlay } from '../../components';
import { getTokenInfo } from '../../utils/account';
import { get } from '../../utils/request';
import { error } from '../../utils/toaster';
import { Container, StyledList, StyledInput, ToolBar, SelectionContainer, SearchBar } from './style';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

const ClassList = () => {
    const [classList, setList] = useState(new Array(10).fill('').map((item, index) => (
        {
            name: '',
            lecture: null,
            subjectId: null,
            semesterCode: null,
            id: index,
            join: null,
        }
    )));
    const [filter, setFilter] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [subjects, setSubjects] = useState([]);

    const user = getTokenInfo();

    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        const API_LECTURER = process.env.REACT_APP_API_URL + '/classes';
        const API_STUDENT = process.env.REACT_APP_API_URL + `/classes/student`;
        const CLASS_API = user.role == 'Lecturer' ? API_LECTURER : API_STUDENT;

        get('/subjects').then((subs) => {
            if (subs.data.code == 200) {
                setSubjects(
                    subs.data.data.reduce((pre, cur) => {
                        pre[cur.id] = cur.name;
                        return pre;
                    }, [])
                );
            }
        }).catch(() => {
            error('An error occured while processing subjects list')
        });
        axios.get(CLASS_API, {
            headers: header,
            params: {
                search: '',
            },
        }).then((list) => {
            if (list.data.code == 200) {
                setList(list.data.data);
            }
        }).catch(() => {
            error('An error occured while processing class list')
        });

        // Promise.all([subs, list]).then(([subs, list]) => {
        //     setSubjects(
        //         subs?.data.data.reduce((pre, cur) => {
        //             pre[cur.id] = cur.name;
        //             return pre;
        //         }, [])
        //     );
        //     setList(list.data.data);
        // });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const open = () => {
        setModalOpen(true);
    };

    const search = (e) => {
        setFilter(e.target.value || '');
        console.log(e.target.value);
        console.log(classList);
        console.log(classList.filter((item) => item.name.includes(filter)));
    };

    const handleSearch = () => {
        //asd
    };

    return (
        <>
            <Overlay isOpen={isModalOpen} closeFn={setModalOpen}>
                <CreateClassForm showing={isModalOpen} setCreate={setModalOpen} setClass={setList} />
            </Overlay>
            <Container>
                <ToolBar>
                    <SearchBar>
                        <Button icon={<SearchIcon />}></Button>
                        <StyledInput
                            type="text"
                            placeholder="Search for class by name..."
                            spellcheck="false"
                            onChange={search}
                            onKeyUp={handleSearch}
                        />
                    </SearchBar>
                    <SelectionContainer>
                        <Selection
                            options={subjects.map((subject, index) => ({ value: index, content: subject }))}
                            placeholder="Filter by subject"
                            maxHeight="600px"
                            arrow={false}
                            icon={<FilterAltIcon />}
                        />
                    </SelectionContainer>
                    {user.role == 'Lecturer' && <Button onClick={open} icon={<AddCircleIcon />}></Button>}
                </ToolBar>
                <StyledList>
                    {
                        classList.filter((item) => item.name.includes(filter)).map((item) => (
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
                    }
                </StyledList>
            </Container>
        </>
    );
};

export default ClassList;
