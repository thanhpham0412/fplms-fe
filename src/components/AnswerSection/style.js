import styled, { keyframes } from 'styled-components';

import { COLOR } from '../../utils/color';

import { TextareaAutosize } from '@mui/material';

const likeAnimate = keyframes`
    from{
        transform: scale(1.15);
    }
    to{
        transform: scale(1.0);
    }
`;

export const Container = styled.div`
    width: 100%;
    display: grid;
    gap: 24px;

    .star-icon {
        color: ${COLOR.primary03};
    }
`;

export const Comment = styled.div`
    height: auto;
    width: 100%;
    padding: 16px;
    background-color: ${COLOR.blue[4]};
    border-radius: 4px;
    font-size: 1rem;
    font-family: Lato;
    color: ${COLOR.primary03};
    display: grid;
    align-items: end;
    grid-template-columns: 1fr auto auto;
    position: relative;
    svg {
        width: 30px;
        cursor: pointer;
    }
    div:nth-child(2),
    textarea,
    svg {
        display: ${({ isLoading }) => (isLoading ? 'none' : '')};
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

export const Col = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    position: relative;
`;

export const Action = styled.div`
    font-weight: bold;
    font-size: 0.9rem;
    color: ${COLOR.blue[2]};
    margin: 3px 0;
    align-self: center;
    margin-right: 15px;
    &:first-child {
        cursor: pointer;

        color: ${({ liked }) => (liked ? COLOR.blue[0] : COLOR.blue[2])};

        animation: ${({ liked }) => (liked ? likeAnimate : '')} 0.5s ease-in-out;
    }
    & > time {
        cursor: pointer;
    }
`;
