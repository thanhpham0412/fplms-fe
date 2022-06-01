import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const StyledContainer = styled.div`
    height: auto;
    width: 100%;
    display: grid;
    grid-template-columns: 275px 1fr 275px;
    z-index: 1;
`;

export const StyledHolder = styled.div`
    background: ${COLOR.blue[4]};
`;

export const StyledHeader = styled.div`
    max-height: 80px;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 1px solid ${COLOR.gray[3]};
    box-sizing: border-box;
`;

export const HeaderContainer = styled.div`
    z-index: 1;
`;

export const BodyContainer = styled.div`
    box-sizing: border-box;
    margin: 1.5rem;
`;
