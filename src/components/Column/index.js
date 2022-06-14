/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import { post } from '../../utils/request';
import {
    Container,
    Header,
    Item,
    DropContainer,
    ItemContainer,
    Details,
    Title,
    Plus,
} from './style';

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const Column = ({ list, droppableId, name, type, setColumns }) => {
    const [isScroll, setScroll] = useState(false);
    const [isBot, setBot] = useState(true);
    const [changeQueue] = useState([]);
    const ref = useRef();

    const changeTitle = (e, id) => {
        setColumns((col) => {
            const clone = col[droppableId].items;
            const index = clone.findIndex((item) => item.id === id);
            clone[index].title = e.target.value;
            return {
                ...col,
                [droppableId]: {
                    ...col[droppableId],
                    items: clone,
                },
            };
        });
    };

    const saveItem = (id) => {
        setColumns((col) => {
            const clone = col[droppableId].items;
            const index = clone.findIndex((item) => item.id === id);
            clone[index].needUpdate = false;
            return {
                ...col,
                [droppableId]: {
                    ...col[droppableId],
                    items: clone,
                },
            };
        });
    };

    const save = () => {
        const updates = list.filter((item) => item.needUpdate);
        updates.forEach((item) => {
            const clone = list;
            const index = list.findIndex((i) => i.id === item.id);
        });
    };

    useEffect(() => {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        if (scrollTop + clientHeight === scrollHeight) {
            setBot(true);
        } else {
            setBot(false);
        }
    }, [list, name, type]);

    const scroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (e.target.scrollTop > 0) {
            setScroll(true);
        } else {
            setScroll(false);
        }
        if (scrollTop + clientHeight === scrollHeight) {
            setBot(true);
        } else {
            setBot(false);
        }
    };

    const add = () => {
        setColumns((col) => ({
            ...col,
            [droppableId]: {
                ...col[droppableId],
                items: [
                    ...col[droppableId].items,
                    {
                        id: uuidv4(),
                        content: 'Topic description',
                        title: `Topic title`,
                        needUpdate: true,
                    },
                ],
            },
        }));
    };

    return (
        <Container type={type}>
            <Header isScroll={isScroll}>
                {name} - {list.length} TOPICS
            </Header>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <DropContainer
                        onScroll={scroll}
                        {...provided.droppableProps}
                        ref={(div) => {
                            ref.current = div;
                            provided.innerRef(div);
                        }}
                        isDragging={snapshot.isDragging}
                    >
                        {list.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <ItemContainer
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Item isDragging={snapshot.isDragging}>
                                            <Title
                                                type="text"
                                                defaultValue={item.title}
                                                onChange={(e) => changeTitle(e, item.id)}
                                            ></Title>
                                            <Details>{item.content}</Details>
                                        </Item>
                                    </ItemContainer>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        <Plus type={type} isBot={isBot} bottom={47} onClick={add}>
                            <AddIcon />
                        </Plus>
                        <Plus type={type} isBot={isBot} bottom={0}>
                            <SaveIcon />
                        </Plus>
                    </DropContainer>
                )}
            </Droppable>
        </Container>
    );
};

export default Column;
