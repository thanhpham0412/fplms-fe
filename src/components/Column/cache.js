/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import { post, get } from '../../utils/request';
import { success, error } from '../../utils/toaster';
import CreateTopicForm from '../CreateTopicForm';
import {
    Container,
    Header,
    Item,
    DropContainer,
    ItemContainer,
    Details,
    Title,
    Status,
    Plus,
} from './style';

import AddIcon from '@mui/icons-material/Add';

const Column = ({ list, droppableId, name, type, setColumns, subjectId }) => {
    const [isScroll, setScroll] = useState(false);
    const [isBot, setBot] = useState(true);
    const ref = useRef();
    const [isOpen, setOpen] = useState(false);
    const [item, setItem] = useState();
    const [disable, setDisable] = useState(false);

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

    const save = (id, data) => {
        // get('/management/subjects', {
        //     classId: 1,
        // }).then((res) => {
        //     console.log(res);
        // });
        const updates = list.filter((item) => item.id == id);
        updates.forEach((item) => {
            setColumns((col) => {
                const clone = col[droppableId].items;
                const index = clone.findIndex((item) => item.id === id);
                clone[index].title = data.name || 'Untitled';
                clone[index].content = data.requirement || '(No requirement)';

                setDisable(true);

                const API = process.env.REACT_APP_API_URL + '/projects';

                axios[item.needAdd ? 'post' : 'put'](API, {
                    actors: 'string',
                    context: 'string',
                    id: 0,
                    name: item.title,
                    problem: item.content,
                    requirements: item.content,
                    subjectId: parseInt(subjectId),
                    theme: 'string',
                })
                    .then((res) => {
                        const data = res.data;
                        if (data.code == 200) {
                            success(`Topic \`${item.title}\` added`);
                            saveItem(item.id);
                        }
                        setDisable(false);
                    })
                    .catch(() => {
                        error(`Topic \`${item.title}\` save error`);
                        setDisable(false);
                    });

                return {
                    ...col,
                    [droppableId]: {
                        ...col[droppableId],
                        items: clone,
                    },
                };
            });
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
                        needAdd: true,
                    },
                ],
            },
        }));
    };

    return (
        <>
            <CreateTopicForm
                disable={disable}
                showing={isOpen}
                item={item}
                setOpen={setOpen}
                save={save}
                subject={name}
            />
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
                                            <Item
                                                isDragging={snapshot.isDragging}
                                                onDoubleClick={() => {
                                                    setOpen(() => {
                                                        setItem(item);
                                                        return true;
                                                    });
                                                }}
                                            >
                                                <Title>{item.title}</Title>
                                                {/* <Details>{item.content}</Details> */}
                                                {/* {item.needUpdate ? <Status>Unsaved</Status> : null} */}
                                            </Item>
                                        </ItemContainer>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            <Plus type={type} isBot={isBot} bottom={0} onClick={add}>
                                <AddIcon />
                            </Plus>
                        </DropContainer>
                    )}
                </Droppable>
            </Container>
        </>
    );
};

export default Column;
