import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const Container = styled.div`
    display: flex;
    align-items: center;
`;

export const Avatar = styled.div`
    width: 50px;
    height: 50px;
    background: ${COLOR.blue[0]};
    border-radius: 4px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 10px;
`;

export const Title = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${COLOR.blue[0]};
    text-transform: uppercase;
`;

export const Subtitle = styled.div`
    font-size: 1rem;
    color: ${COLOR.blue[1]};
`;
