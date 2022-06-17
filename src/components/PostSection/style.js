import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const Container = styled.div`
    width: 100%;
    max-width: 700px;
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
    width: 100%;
    font-size: 1rem;
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
`;

export const AuthorAva = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${COLOR.blue[3]};
`;

export const Answers = styled.div`
    font-size: 1rem;
    color: ${COLOR.blue[0]};
    cursor: pointer;
`;
