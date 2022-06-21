import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    padding: 1rem;
    background: ${({ type }) => (type == 0 ? COLOR.green[5] : COLOR.blue[5])};
    border-radius: 4px;
    box-sizing: border-box;
    height: fit-content;
    user-select: none;
    width: 100%;

    * {
        font-family: Lato;
    }
`;

export const Header = styled.div`
    padding-bottom: 1rem;
    color: ${COLOR.primary03};
    font-weight: bold;
    transition: border 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: ${({ isScroll }) =>
        isScroll ? `2px solid ${COLOR.blue[2]}` : `2px solid transparent`};
`;

export const Title = styled.div`
    color: ${COLOR.blue[0]};
    font-weight: bold;
    width: 100%;
    outline: none;
    border: none;
    padding: 0;
`;

export const ItemContainer = styled.div`
    padding: 0.5rem 0;
`;

export const Status = styled.div`
    color: ${COLOR.red[0]};
    outline: none;
    border: none;
    padding: 0;
    margin-top: 0.5rem;
`;

export const Item = styled.div`
    background: ${COLOR.primary02};
    width: auto;
    height: auto;
    padding: 0.5rem;
    border-radius: 4px;

    box-shadow: ${({ isDragging }) =>
        isDragging ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px' : null};
    border: ${({ isDragging }) =>
        isDragging ? `2px solid ${COLOR.blue[0]}` : '2px solid transparent'};
    transition: box-shadow 0.3s;
    box-sizing: border-box;
`;

export const DropContainer = styled.div`
    /* min-height: 250px;
    max-height: 500px; */

    height: 100%;
    min-height: 300px;
    max-height: 300px;
    overflow-y: auto;

    ::-webkit-scrollbar {
        display: none;
    }

    > div:nth-last-of-type(1) {
        padding-bottom: 0;
    }
`;

export const Details = styled.div`
    margin-top: 0.5rem;
`;

export const Plus = styled.div`
    position: sticky;
    bottom: 0px;
    align-self: flex-start;
    height: 40px;
    margin-left: auto;
    margin-top: 0.5rem;
    border-radius: ${({ isBot }) => (isBot ? '4px' : '50%')};
    bottom: ${({ isBot, bottom }) => (isBot ? `${0}px` : `${bottom}px`)};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
        fill: ${COLOR.primary02};
    }
    :hover {
        filter: brightness(90%);
    }
    box-sizing: border-box;
    width: ${({ isBot }) => (isBot ? '100%' : '40px')};
    background: green;
    border: ${({ isBot, type }) => {
        if (!isBot) return `4px solid ${type == 0 ? COLOR.green[5] : COLOR.blue[5]}`;
        if (isBot) return `4px solid ${type == 0 ? COLOR.green[0] : COLOR.blue[0]}`;
    }};
    background: ${({ type }) => (type == 0 ? COLOR.green[0] : COLOR.blue[0])};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
