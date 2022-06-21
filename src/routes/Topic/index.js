/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import { Column, CreateTopicForm } from '../../components';
import { get } from '../../utils/request';
import { Container } from './style';

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
        title: `Project Base Management`,
    }));

const Topic = () => {
    const [subjects, setSubjects] = useState([]);
    const [columns, setColumns] = useState({
        // ['Temporary']: {
        //     name: 'Temporary',
        //     items: getItems(10, 'Temporary'),
        //     type: 0,
        // },
    });

    useEffect(() => {
        const subjects = get('/management/subjects');
        const projects = get('/management/projects');

        Promise.all([subjects, projects]).then(([subjects, projects]) => {
            subjects = subjects.data.data;
            projects = projects.data.data;
            subjects.forEach((subject) => {
                if (!columns[subject.id])
                    setColumns((col) => ({
                        ...col,
                        [subject.id]: {
                            name: subject.name,
                            items: projects
                                .filter((project) => project.subjectId == subject.id)
                                .map((item) => ({
                                    id: item.id + subject.name,
                                    title: item.name,
                                    content: item.requirement,
                                })),
                            type: 1,
                        },
                    }));
            });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, data]) => (
                        <Column
                            type={data.type}
                            name={data.name}
                            list={data.items}
                            key={id}
                            subjectId={id}
                            setColumns={setColumns}
                            droppableId={id}
                        ></Column>
                    ))}
                </DragDropContext>
            </Container>
        </>
    );
};

export default Topic;
