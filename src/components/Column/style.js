import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    padding: 1rem;
    background: ${COLOR.blue[5]};
    border-radius: 4px;
    box-sizing: border-box;
    height: fit-content;
    user-select: none;
    width: 25%;

    * {
        font-family: Lato;
        box-sizing: border-box;
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

export const Title = styled.span`
    color: ${COLOR.blue[0]};
    font-weight: bold;
`;

export const ItemContainer = styled.div`
    padding: 0.5rem 0;
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

    height: 500px;
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
