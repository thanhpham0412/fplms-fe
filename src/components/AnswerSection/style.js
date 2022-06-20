import styled from 'styled-components';

import { COLOR } from '../../utils/color';

import { TextareaAutosize } from '@mui/material';

export const Container = styled.div`
    width: 100%;
    display: grid;
    gap: 24px;
`;

export const Comment = styled.div`
    height: auto;
    padding: 16px;
    background-color: ${COLOR.blue[4]};
    border-radius: 4px;
    font-size: 1rem;
    font-family: Lato;
    color: ${COLOR.primary03};
    display: grid;
    align-items: end;
    grid-template-columns: 1fr auto auto;
    svg {
        width: 30px;
        cursor: pointer;
    }
`;

export const CommentInput = styled(TextareaAutosize)`
    width: 100%;
    height: auto;
    outline: none;
    border: none;
    resize: none;
    background-color: ${COLOR.blue[4]};
    border-radius: 4px;
    font-size: 1rem;
    font-family: Lato;
    color: ${COLOR.primary03};
`;

export const Answers = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
    img {
        width: 40px;
        height: auto;
        object-fit: cover;
        border-radius: 50%;
    }
`;
