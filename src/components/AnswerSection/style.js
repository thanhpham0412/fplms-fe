import styled from 'styled-components';

import { COLOR } from '../../utils/color';

import { TextareaAutosize } from '@mui/material';

export const Container = styled.div`
    width: 100%;
    display: grid;
    gap: 15px;
`;

export const Avatar = styled.div`
    width: 40px;
    height: 40px;
    background-color: ${COLOR.blue[3]};
    border-radius: 50%;
`;

export const CommentInput = styled(TextareaAutosize)`
    width: 100%;
    /* min-height: 40px; */
    outline: none;
    border: none;
    resize: none;
    background-color: ${COLOR.blue[4]};
    border-radius: 4px;
    font-size: 1rem;
    font-family: Lato;
    color: ${COLOR.primary03};

    display: inline-block;
`;

export const Row = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
`;

export const Comment = styled.div`
    width: 100%;
    padding: 16px;
    /* min-height: 40px; */
    background-color: ${COLOR.blue[4]};
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    span {
        /* position: absolute;
        right: 16px;
        bottom: 16px; */
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        align-items: end;
        svg {
            font-size: 1.2rem;
            color: ${COLOR.primary03};
            cursor: pointer;
        }
    }
`;
