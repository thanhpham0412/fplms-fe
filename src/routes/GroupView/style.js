import styled from 'styled-components';

import { COLOR } from '../../utils/style';

import { TextareaAutosize } from '@mui/material';

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 24px;

    * {
        font-family: Lato;
    }
`;

export const StyledList = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
`;

export const StyledItem = styled.div`
    box-sizing: border-box;
    font-size: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: fit-content;
    background: ${({ feedback }) => (feedback ? COLOR.green[5] : COLOR.blue[5])};
`;

export const Title = styled.div`
    color: ${COLOR.green[0]};
    font-weight: bold;
    color: ${({ feedback }) => (feedback ? COLOR.green[0] : COLOR.blue[0])};
`;

export const Content = styled.div``;

export const SideBar = styled.div`
    position: sticky;
    top: 104px;
    height: fit-content;
`;

export const CommingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Icon = styled.div`
    width: fit-content;
    height: fit-content;

    svg {
        padding: 1rem;
        background: ${COLOR.blue[5]};
        fill: ${COLOR.blue[0]};
        border-radius: 4px;
        display: block;
    }
`;

export const CommingSection = styled.div`
    display: flex;
    gap: 1rem;
    height: fit-content;
`;

export const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const CommingTitle = styled.div`
    font-weight: bold;
    font-size: 1rem;
`;

export const Status = styled.div`
    font-size: 0.75rem;
    color: ${({ status }) => {
        switch (status) {
            case 'done':
                return COLOR.green[0];
            case 'missed':
                return COLOR.red[0];
        }
    }};
`;

export const StyledH4 = styled.h4`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const Round = styled.span`
    border-radius: 50%;
    background: ${COLOR.blue[0]};
    color: ${COLOR.primary02};
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Select = styled.div`
    margin-bottom: 1rem;
    max-width: 200px;
`;

export const PickContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const UnPickTitle = styled.h3`
    font-weight: 900;
    letter-spacing: 0.05rem;
`;

export const UnPickDes = styled.p``;

export const TopicList = styled.div`
    width: 100%;
    height: auto;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
`;

export const Topic = styled.div`
    display: grid;
`;

export const PickHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${COLOR.blue[0]};
    color: ${COLOR.primary02};
    border-radius: 2px;
    padding: 1rem;

    span {
        font-size: 1.25rem;
    }
`;

export const PickBtn = styled.button`
    padding: 0.5rem;
    background: ${COLOR.blue[0]};
    border-radius: 2px;
    cursor: pointer;
    border: 2px solid ${COLOR.primary02};
    box-sizing: border-box;
    color: ${COLOR.primary02};
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    :hover {
        background: ${COLOR.primary02};
        color: ${COLOR.blue[0]};
    }
`;

export const FeedBackView = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
`;

export const StyledItemLec = styled.div`
    box-sizing: border-box;
    font-size: 1rem;
    padding: 1rem;
    border-radius: 2px;
    display: flex;
    align-items: center;
    background: ${COLOR.blue[5]};
    justify-content: space-between;
    gap: 1rem;
    height: fit-content;
    transition: all 0.3s;
    cursor: pointer;

    :hover {
        background: ${COLOR.blue[4]};
    }
`;

export const ScoreBoard = styled.div`
    width: 300px;
    height: 300px;
    transform: translateX(-100%);
    top: 6rem;
    left: 5rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const CommentInput = styled(TextareaAutosize)`
    width: 100%;
    height: auto;
    outline: none;
    border: none;
    resize: none;
    background-color: ${COLOR.primary02};
    border-radius: 2px;
    font-size: 1rem;
    padding: 1rem;
    font-family: Lato;
    color: ${COLOR.primary03};
    box-sizing: border-box;
`;

export const ScoreBar = styled.input`
    width: 100%;
    height: auto;
    outline: none;
    border: none;
    resize: none;
    background-color: ${COLOR.primary02};
    border-radius: 2px;
    font-size: 1rem;
    padding: 1rem;
    font-family: Lato;
    color: ${COLOR.primary03};
    box-sizing: border-box;
`;
