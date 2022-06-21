import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const Title = styled.div`
    padding: 1rem;
    background: ${COLOR.blue[0]};
    color: ${COLOR.primary02};
    border-radius: 2px;
    cursor: pointer;
    margin: 0.5rem 0;
`;

export const Expando = styled.div`
    padding: 0 0.5rem;
    overflow: hidden;
    max-height: ${({ isExpand }) => isExpand || 0}px;
    transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;
