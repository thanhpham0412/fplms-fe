import styled from 'styled-components';

export const Round = styled.div`
    width: 200px;
    height: 200px;
    background: #5680f9;
    border-radius: 50%;
    margin: auto;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    svg {
        position: absolute;
        bottom: -10px;
        right: -10px;
        fill: #5680f9;
        width: 150px;
        stroke: #fff;
        height: 150px;
    }
`;

export const Star = styled.div`
    border-radius: 50%;
    width: 5px;
    height: 5px;
    background: #000;
    position: absolute;
    left: ${({ position }) => position.x}px;
    top: ${({ position }) => position.y}px;
`;

export const Container = styled.div`
    text-align: center;
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
`;
