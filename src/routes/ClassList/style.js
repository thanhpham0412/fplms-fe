import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const Container = styled.div`
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
`;

export const Hero = styled.div`
    width: 100%;
    height: 350px;
    background: ${COLOR.blue[0]};
    border-radius: 8px;
`;

export const Title = styled.div`
    margin: 16px 0;
    font-size: 1rem;
    font-family: Lato;
    font-weight: bold;
    color: ${COLOR.gray[0]};
`;

export const StyledList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: fit-content;
    gap: 24px;

    @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`;
