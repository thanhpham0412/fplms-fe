/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import { Column, CreateTopicForm, Selection } from '../../components';
import { get } from '../../utils/request';
import { Container, SelectContainer, Header } from './style';

const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing' +
    'elit, sed do eiusmod tempor incididunt ut labore et' +
    'dolore magna aliqua. Accumsan lacus vel facilisis' +
    'volutpat est velit egestas dui id. Aliquam purus sit' +
    'Phasellus ultrices feugiat justo, non semper nunc tincidunt' +
    'in. Etiam mauris nibh, egestas tristique viverra vitae, venenatis et metus' +
    'amet luctus venenatis. Morbi tincidunt augue.';

const getItems = (count, hash = Math.random()) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k}-${hash}`,
        content: lorem.slice(0, ~~(Math.random() * (lorem.length - 100)) + 100),
        title: lorem.slice(0, ~~(Math.random() * 10) + 20),
        subjectId: Math.floor(Math.random() * 4),
        semesterCode: Math.floor(Math.random() * 10) > 5 ? 'SP21' : 'WI21',
    }));

const Topic = () => {
    const [projects, setProjects] = useState([]);
    const [isLoad, setLoad] = useState(true);
    const [subjects, setSubjects] = useState([
        {
            value: -1,
            content: 'All Subjects',
        },
    ]);
    const [semesters, setSemesters] = useState([
        {
            value: -1,
            content: 'All Semesters',
        },
    ]);
    const [filter, setFilter] = useState({
        subject: {
            value: -1,
            content: 'All Subjects',
        },
        semester: {
            value: -1,
            content: 'All Semesters',
        },
    });
    const [columns, setColumns] = useState({
        all: {
            name: 'All',
            items: getItems(50),
            type: 1,
        },
    });

    useEffect(() => {
        const subjects = get('/subjects');
        const projects = get('/projects');
        const semester = get('/semesters');

        Promise.all([subjects, projects, semester]).then(([subjects, projects, semester]) => {
            subjects = subjects.data.data;
            projects = projects.data.data;
            semester = semester.data.data;
            setSubjects((subs) =>
                subs.concat(subjects.map(({ id, name }) => ({ value: id, content: name })))
            );
            setSemesters((sems) =>
                sems.concat(
                    semester.map((semester) => ({
                        value: semester.code,
                        content: semester.code,
                    }))
                )
            );
            setProjects((prjs) => (Array.isArray(projects) ? prjs.concat(projects) : []));
            setLoad(false);
        });
    }, []);

    useEffect(() => {
        setColumns((col) => ({
            ...col,
            all: {
                name: `${filter.subject.content} of ${filter.semester.content}`,
                items: (() => {
                    let list = projects;
                    if (filter.semester.value != -1) {
                        list = list.filter(
                            (project) => project.semesterCode == filter.semester.value
                        );
                    }
                    if (filter.subject.value != -1) {
                        list = list.filter((project) => project.subjectId == filter.subject.value);
                    }
                    return list;
                })(),
                type: 1,
            },
        }));
    }, [projects, filter]);

    const onSelectionChange = (e, key) => {
        setFilter({
            ...filter,
            [key]: e,
        });
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceCol = columns[source.droppableId];
            const destCol = columns[destination.droppableId];
            const sourceItems = [...sourceCol.items];
            const destItems = [...destCol.items];

            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceCol,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destCol,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    return (
        <>
            <Container>
                <Header>
                    <SelectContainer>
                        <Selection
                            options={subjects}
                            placeholder="Subject"
                            onChange={(e) => onSelectionChange(e, 'subject')}
                            maxHeight="200px"
                            isLoad={isLoad}
                        />
                    </SelectContainer>
                    <SelectContainer>
                        <Selection
                            options={semesters}
                            placeholder="Semesters"
                            onChange={(e) => onSelectionChange(e, 'semester')}
                            maxHeight="200px"
                            isLoad={isLoad}
                        />
                    </SelectContainer>
                </Header>
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, data]) => (
                        <Column
                            type={data.type}
                            name={data.name}
                            list={data.items}
                            key={id}
                            subjects={subjects}
                            setColumns={setColumns}
                            droppableId={id}
                            setProjects={setProjects}
                        ></Column>
                    ))}
                </DragDropContext>
            </Container>
        </>
    );
};

export default Topic;
