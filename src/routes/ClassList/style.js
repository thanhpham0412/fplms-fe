import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
`;

export const Hero = styled.div`
    width: 100%;
    height: 350px;
    background: ${COLOR.blue[0]};
    border-radius: 8px;
`;

export const StyledInput = styled.input`
    margin-bottom: 1.25rem;
    font-size: 1rem;
    width: 100%;
    color: ${COLOR.primary03};
    border: none;
    outline: none;
    box-sizing: border-box;
    font-family: Lato;
    font-size: 16px;
`;

export const StyledList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: fit-content;
    gap: 24px;

    @media (max-width: 1400px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;
