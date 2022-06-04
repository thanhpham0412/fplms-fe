import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const Container = styled.div`
    min-width: 100px;
    min-height: 40px;
    background-color: #eef2ff;
    border-radius: 4px;
    border: 1px solid #99b3fb;
    color: #8b8b8b;
    font-size: 1rem;
    position: relative;
`;
export const Selected = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    svg {
        width: 1.4rem;
        height: 1.4rem;
        padding: 1px;
        margin: 0 5px;
        background-color: #bbccfd;
        border-radius: 50%;
    }
`;
export const OptContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    display: ${({ isDisplay }) => (isDisplay ? 'block' : 'none')};
    border: 1px solid #99b3fb;
    position: absolute;
`;

export const Option = styled.div`
    width: 100%;
    padding: 5px;
    font-size: 1rem;
    color: ${COLOR.gray[0]};
    max-height: 40px;
    padding: 0.8rem;
    background-color: #eef2ff;
    font-size: 1rem;
    cursor: pointer;
`;
