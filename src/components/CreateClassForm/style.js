import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const Container = styled.div`
    width: 600px;
    height: auto;
    background: green;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    overflow: hidden;
    border-radius: 4px;
    background: ${COLOR.primary02};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    display: block;

    * {
        box-sizing: border-box;
    }

    svg {
        box-sizing: border-box;
        padding: 4px;
        background: ${COLOR.red[0]};
        border-radius: 4px;
        fill: ${COLOR.primary02};
        cursor: pointer;
    }
`;

export const StyledHeader = styled.div`
    padding: 12px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${COLOR.gray[2]};
`;

export const StyledBody = styled.div`
    padding: 12px;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
    display: flex;
`;

export const StyledJumbotron = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    font-weight: bold;
    color: ${COLOR.primary03};
`;

export const SubTitle = styled.div`
    font-weight: bold;
    color: ${COLOR.gray[1]};
`;

export const Row = styled.div`
    display: flex;
    gap: 16px;
`;

export const StyledInput = styled.input`
    border-radius: 4px;
    background: ${COLOR.blue[5]};
    outline: none;
    border: none;
    padding: 1rem;
    width: 100%;
`;

export const Col = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

export const StyledSelection = styled.input`
    border-radius: 4px;
    background: ${COLOR.blue[5]};
    outline: none;
    border: none;
    display: flex;
    padding: 1rem;
`;

export const StyledButton = styled.button`
    background: ${COLOR.blue[0]};
    color: white;
    border: none;
    padding: 16px;
    border-radius: 4px;
    cursor: pointer;
`;
