import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const Container = styled.div`
    width: 100%;
    padding: 16px 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: ${COLOR.blue[5]};
    border-radius: 4px;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: ${COLOR.blue[0]};
    cursor: pointer;
`;

export const Course = styled.div`
    font-size: 1rem;
    color: ${COLOR.blue[0]};
`;

export const PostContent = styled.div`
    max-width: 100%;
    font-size: 1rem;
    word-break: break-all;
    color: ${COLOR.primary03};
    cursor: pointer;
`;

export const FeatureList = styled.div`
    display: flex;
    gap: 8px;
`;

export const PostFeature = styled.div`
    font-size: 1rem;
    color: ${COLOR.blue[1]};
    background-color: ${COLOR.blue[4]};
    padding: 2px;
    border-radius: 4px;
    :hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: 0.1s ease-in-out;
    }
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${COLOR.blue[3]};
`;

export const Author = styled.div`
    display: flex;
    align-items: center;
    font-size: 10px;
    cursor: pointer;
    color: ${COLOR.primary03};
    p {
        margin: 0 8px;
    }
    span {
        color: ${COLOR.blue[2]};
        :hover {
            color: ${COLOR.blue[0]};
        }
    }
    img {
        width: 21px;
        height: auto;
        object-fit: cover;
        border-radius: 50%;
    }
`;

export const AuthorAva = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${COLOR.blue[3]};
`;

export const Answers = styled.div`
    font-size: 1rem;
    color: ${COLOR.red[2]};
    cursor: pointer;
`;

export const Vote = styled.div`
    align-self: flex-start;
    max-height: 80px;
    margin-left: 24px;
    margin-right: 12px;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${COLOR.gray[0]};
    font-size: 30px;
    line-height: 0.4;
    svg {
        color: ${({ upvoted }) => (upvoted ? COLOR.green[0] : COLOR.gray[0])};
        font-size: 50px;
        cursor: pointer;
    }
    div {
        font-style: oblique;
    }
`;
