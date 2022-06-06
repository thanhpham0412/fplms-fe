import styled from 'styled-components';

import { COLOR } from '../../utils/color';

import { TextareaAutosize } from '@mui/material';

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
`;

export const Avatar = styled.div`
    width: 40px;
    height: 40px;
    background-color: ${COLOR.blue[3]};
    border-radius: 50%;
`;

export const CommentInput = styled(TextareaAutosize)`
    max-width: 100%;
    min-height: 40px;
    outline: none;
    border: none;
    resize: none;
    padding: 16px;
    background-color: ${COLOR.blue[4]};
    border-radius: 4px;
    font-size: 1rem;
    font-family: Lato;
    color: ${COLOR.primary03};
`;
