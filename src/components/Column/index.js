/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import { Editor, EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import { fromHTML } from '../../utils/draft';
import { getRndInteger } from '../../utils/random';
import { post, get } from '../../utils/request';
import { success, error } from '../../utils/toaster';
import AdvanceEditor from '../AdvanceEditor';
import CreateTopicForm from '../CreateTopicForm';
import Overlay from '../Overlay';
import Selection from '../Selection';
import Skeleton from '../Skeleton';
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
    Footer,
    DetailText,
    DropableContainer,
    SendBtn,
    GoalContainer,
    GoalDes,
    ScoreBar,
} from './style';

import AddIcon from '@mui/icons-material/Add';

const header = {
    Authorization: `${localStorage.getItem('token')}`,
};

const TEMPLATE = '<b>(Project has no requirement)</b>';

const Column = ({ list, droppableId, name, type, setColumns, subjects, setProjects }) => {
    const [isScroll, setScroll] = useState(false);
    const [isBot, setBot] = useState(true);
    const ref = useRef();
    const [isOpen, setOpen] = useState(false);
    const [title, setTitle] = useState();
    const [item, setItem] = useState({});
    const [disable, setDisable] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const saveItem = (id, newId) => {
        setColumns((col) => {
            const clone = col[droppableId].items;
            const index = clone.findIndex((item) => item.id === id);
            console.log('saved: ' + index);
            clone[index].needAdd = false;
            if (newId) clone[index].id = newId;
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
        setColumns((col) => {
            const clone = col[droppableId].items;
            const index = clone.findIndex((_item) => _item.id === item.id);
            clone[index] = {
                ...clone[index],
            };
            clone[index].name = title || 'Untitled';
            clone[index].requirements =
                JSON.stringify(convertToRaw(editorState.getCurrentContent())) ||
                JSON.stringify(convertToRaw(fromHTML(TEMPLATE)));
            clone[index].subjectId = item.subjectId;

            setDisable(true);

            const API = process.env.REACT_APP_API_URL + '/projects';

            console.log(item);

            const req = {
                actors: 'string',
                context: '',
                name: title,
                problem: '',
                requirements: clone[index].requirements,
                subjectId: item.subjectId,
                semesterCode: 'SP21',
                theme: 'string',
                id: item.id,
            };

            if (item.needAdd) {
                delete req.id;
            }

            axios[item.needAdd ? 'post' : 'put'](API, req, { headers: header })
                .then((res) => {
                    const data = res.data;
                    if (data.code == 200) {
                        // setProjects((projects) => projects.concat(clone[index]));
                        success(`Topic \`${item.name}\` ${item.needAdd ? 'added' : 'updated'}`);
                        console.log(data);
                        saveItem(item.id, item.needAdd ? data.data : null);
                        setOpen(false);
                    } else {
                        error(data.message);
                        setOpen(false);
                    }
                    setDisable(false);
                })
                .catch(() => {
                    error(`Topic \`${item.name}\` save error`);
                    setDisable(false);
                });

            console.log(item);

            return {
                ...col,
                [droppableId]: {
                    ...col[droppableId],
                    items: clone,
                },
            };
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
        setColumns((col) => {
            console.log(col);
            return {
                ...col,
                [droppableId]: {
                    ...col[droppableId],
                    items: [
                        ...col[droppableId].items,
                        {
                            id: uuidv4(),
                            requirements: JSON.stringify(convertToRaw(fromHTML(TEMPLATE))),
                            name: `Topic title`,
                            subjectId: 1,
                            needAdd: true,
                        },
                    ],
                },
            };
        });
    };

    const change = (e) => {
        setItem((item) => ({
            ...item,
            subjectId: e.value,
        }));
    };

    return (
        <>
            <Overlay isOpen={isOpen} fullFill={true}>
                <AdvanceEditor
                    avatars={[]}
                    editorState={editorState}
                    setEditorState={setEditorState}
                    closeFn={() => setOpen(false)}
                >
                    <GoalContainer>
                        <GoalDes>Topic Title</GoalDes>
                        <ScoreBar
                            placeholder={"Topic's Title"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </GoalContainer>
                    <GoalContainer>
                        <GoalDes>Subject</GoalDes>
                        <Selection
                            onChange={change}
                            options={subjects.slice(1)}
                            placeholder={
                                subjects.reduce((pre, cur) => {
                                    pre[cur.value] = cur.content;
                                    return pre;
                                }, [])[item.subjectId] || null
                            }
                        ></Selection>
                    </GoalContainer>
                    <SendBtn onClick={save}>Save Topic</SendBtn>
                </AdvanceEditor>
            </Overlay>
            <Container type={type}>
                <Header isScroll={isScroll}>
                    {name} - {list.length} topics
                </Header>
                <DropableContainer>
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
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id + ''}
                                        index={index}
                                    >
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
                                                            setItem((_item) => ({
                                                                ..._item,
                                                                ...item,
                                                            }));
                                                            setTitle(item.name || '');
                                                            setEditorState(
                                                                EditorState.createWithContent(
                                                                    convertFromRaw(
                                                                        JSON.parse(
                                                                            item.requirements
                                                                        )
                                                                    )
                                                                )
                                                            );
                                                            return true;
                                                        });
                                                    }}
                                                >
                                                    {item.subjectId ? (
                                                        <DetailText>
                                                            {
                                                                subjects.reduce((pre, cur) => {
                                                                    pre[cur.value] = cur.content;
                                                                    return pre;
                                                                }, [])[item.subjectId]
                                                            }
                                                        </DetailText>
                                                    ) : (
                                                        <Skeleton style={{ padding: '0.5rem' }} />
                                                    )}
                                                    {item.needAdd ? (
                                                        <DetailText red>UNSAVED</DetailText>
                                                    ) : null}
                                                    <Title>
                                                        {item.name || (
                                                            <Skeleton
                                                                style={{
                                                                    width: `40ch`,
                                                                }}
                                                            />
                                                        )}
                                                    </Title>
                                                    {/* <Details>{item.content}</Details> */}
                                                    {/* {item.needUpdate ? <Status>Unsaved</Status> : null} */}
                                                </Item>
                                            </ItemContainer>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {/* <Plus type={type} isBot={isBot} bottom={0} onClick={add}>
                                <AddIcon />
                            </Plus> */}
                            </DropContainer>
                        )}
                    </Droppable>
                </DropableContainer>
                <Footer onClick={add}>
                    <AddIcon /> Add topic
                </Footer>
            </Container>
        </>
    );
};

export default Column;
