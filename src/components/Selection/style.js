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
    margin-top: 0.5rem;
    padding: 1rem;
    border-radius: 2px;
    background: ${({ open }) => (open ? COLOR.blue[0] : COLOR.blue[5])};
    color: ${({ open }) => (open ? COLOR.primary02 : COLOR.primary03)};
    border: 1px solid ${COLOR.blue[0]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 300ms;
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
    list-style-type: none;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    width: 100%;
    padding: 0.5rem 0 0 0;
    margin-block-start: -1px;
    margin-block-end: 0.5em;
    display: ${({ open }) => (open ? 'flex' : 'none')};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
`;

export const StyledItem = styled.li`
    display: flex;
    padding: 1rem;
    background: ${COLOR.blue[5]};
    transition: all 0.1s;

    transform-origin: top center;
    animation-name: ${scaleZ};
    animation-duration: 350ms;
    animation-delay: ${({ delay }) => delay}ms;

    :hover {
        background: ${COLOR.blue[0]};
        color: ${COLOR.primary02};
    }
`;
