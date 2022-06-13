/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import { Container, Header, Item, DropContainer, ItemContainer, Details, Title } from './style';

const MAX_LENGTH = 140;

const Column = ({ list, droppableId, name }) => {
    const [isScroll, setScroll] = useState(false);

    const scroll = (e) => {
        if (e.target.scrollTop > 0) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };
    return (
        <Container>
            <Header isScroll={isScroll}>
                {name} - {list.length} TOPICS
            </Header>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <DropContainer
                        onScroll={scroll}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
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
                                            <Title>{item.title}</Title>
                                            <Details>{item.content}</Details>
                                        </Item>
                                    </ItemContainer>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </DropContainer>
                )}
            </Droppable>
        </Container>
    );
};

export default Column;
