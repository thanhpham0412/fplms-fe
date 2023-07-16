import { useState, useEffect } from 'react';

import axios from 'axios';

import {
    ClassSection as Section,
    CreateClassForm,
    Button,
    Selection,
    Overlay,
    NoResult,
} from '../../components';
import { getTokenInfo } from '../../utils/account';
import { error } from '../../utils/toaster';
import {
    Container,
    StyledList,
    StyledInput,
    ToolBar,
    SelectionContainer,
    SearchBar,
    NoResultContainer,
} from './style';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

const ClassList = () => {
    const [classList, setList] = useState(
        new Array(10).fill('').map((item, index) => ({
            name: '',
            email: null,
            enrollKey: null,
            lecture: null,
            subjectId: null,
            semesterCode: null,
            id: index,
            isJoin: null,
        }))
    );
    const [filter, setFilter] = useState({
        name: '',
        subjectId: -1,
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [subjects, setSubjects] = useState([]);

    const user = getTokenInfo();

    const header = {
        Authorization: `bearer ${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        const API_LECTURER = process.env.REACT_APP_API_URL + '/classes';
        const API_STUDENT = process.env.REACT_APP_API_URL + `/classes/student`;
        const CLASS_API = user.role == 'Lecturer' ? API_LECTURER : API_STUDENT;

        axios
            .get(process.env.REACT_APP_API_URL + '/subjects', { headers: header })
            .then((subs) => {
                if (subs.data.code == 200) {
                    console.log("subs");
                    console.log(subs.data);
                    setSubjects(
                        subs.data.data.reduce((pre, cur) => {
                            pre[cur.id] = cur.name;
                            return pre;
                        }, [])
                    );
                }
            })
            .catch(() => {
                error('An error occured while processing subjects list');
            });
        axios
            .get(CLASS_API, {
                headers: header,
            })
            .then((list) => {
                if (list.data.code == 200) {
                    console.log("list");
                    console.log(list.data);
                    setList(list.data.data);
                }
            })
            .catch(() => {
                error('An error occured while processing class list');
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
        setFilter((filter) => ({
            ...filter,
            name: e.target.value.toLowerCase() || '',
        }));
    };

    const subjectFilter = (e) => {
        console.log(e);
        setFilter((filter) => ({
            ...filter,
            subjectId: e.value || -1,
        }));
    };

    const handleSearch = () => {
        //asd
    };

    return (
        <>
            <Overlay isOpen={isModalOpen} closeFn={setModalOpen}>
                <CreateClassForm
                    showing={isModalOpen}
                    setCreate={setModalOpen}
                    setClass={setList}
                />
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
                            options={[{ value: -1, content: 'All' }].concat(
                                subjects.map((subject, index) => ({
                                    value: index,
                                    content: subject,
                                }))
                            )}
                            placeholder="Filter by subject"
                            maxHeight="600px"
                            arrow={false}
                            icon={<FilterAltIcon />}
                            onChange={subjectFilter}
                        />
                    </SelectionContainer>
                    {user.role == 'Lecturer' && (
                        <Button onClick={open} icon={<AddCircleIcon />}></Button>
                    )}
                </ToolBar>
                {classList && classList.length ? (
                    <StyledList>
                        {classList
                            .filter((item) => item.name.toLowerCase().includes(filter.name))
                            .filter((item) =>
                                filter.subjectId != -1 ? item.subjectId == filter.subjectId : true
                            )
                            .map((item) => (
                                <Section
                                    key={item.id}
                                    name={item.name}
                                    lecture={item.lecturerDto && item.lecturerDto.name}
                                    enrollKey={item && item.enrollKey}
                                    email={item.lecturerDto && item.lecturerDto.email}
                                    subjectId={subjects[item.subjectId]}
                                    semesterCode={item.semesterCode}
                                    id={item.id}
                                    join={item.isJoin}
                                />
                            ))}
                    </StyledList>
                ) : (
                    <NoResultContainer>
                        <NoResult>
                            <h4>There is no class for now</h4>
                        </NoResult>
                    </NoResultContainer>
                )}
            </Container>
        </>
    );
};

export default ClassList;
