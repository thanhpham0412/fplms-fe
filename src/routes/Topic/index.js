import { useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import { Column } from '../../components';
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
    const [columns, setColumns] = useState({
        ['Temporary']: {
            name: 'Temporary',
            items: getItems(3, 'Temporary'),
            type: 0,
        },
        ['mas-202']: {
            name: 'MAS 202',
            items: getItems(5, 'mas'),
        },
        ['swr-123']: {
            name: 'SWR 123',
            items: getItems(2, 'jpd'),
        },
        ['prj-301']: {
            name: 'PRJ 301',
            items: getItems(10, 'prj'),
        },
    });

    get('/management/projects', {});

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
        <Container>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, data]) => (
                    <Column
                        type={data.type}
                        name={data.name}
                        list={data.items}
                        key={id}
                        droppableId={id}
                    ></Column>
                ))}
            </DragDropContext>
        </Container>
    );
};

export default Topic;
