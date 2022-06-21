import styled, { keyframes } from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    * {
        box-sizing: border-box;
        user-select: none;
    }
`;

export const StyledButton = styled.div`
    padding: 1rem;
    border-radius: 2px;
    background: ${({ open }) => (open ? COLOR.blue[0] : COLOR.primary02)};
    color: ${({ open }) => (open ? COLOR.primary02 : COLOR.primary03)};
    border: 1px solid ${COLOR.blue[0]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};
    opacity: ${({ disable }) => (disable ? 0.7 : 1)};
    transition: all 300ms;

    svg {
        transition: all 300ms;
        transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
    }
`;

const scaleZ = keyframes`
    0% {
        opacity: 0;
        transform: scale(0);
    }

    80% {
        transform: scale(1.07);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

export const StyledList = styled.ul`
    color: #fff;
    list-style-type: none;
    flex-direction: column;
    position: absolute;
    border-radius: 4px;
    max-height: auto;
    z-index: 1;
    width: 100%;
    padding: 0;
    transform: translateY(0.5rem);
    margin-block-start: -1px;
    border-radius: 2px;
    overflow: hidden;
    margin-block-end: 0.5em;
    display: ${({ open }) => (open ? 'flex' : 'none')};
`;

export const StyledItem = styled.li`
    padding: 1rem;
    background: ${COLOR.blue[0]};
    transition: all 0.1s;

    animation: ${scaleZ} 300ms ${({ delay }) => delay}ms ease-in-out forwards;

    transform-origin: top center;
    opacity: 0;
    cursor: pointer;

    :hover {
        background: ${COLOR.blue[1]};
        color: ${COLOR.primary02};
    }
`;
