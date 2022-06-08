import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 100%;
    background: blue;
    gap: 8px;
    align-items: center;
`;

export const StyledInputContainer = styled.div`
    font-size: 1rem;
    overflow-y: hidden;
    height: 100%;
    position: relative;
    width: fit-content;
    min-width: 40px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledInput = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    text-align: center;
    transition: color 300ms;
    overflow: hidden;
`;

export const Icon = styled.div`
    position: absolute;
`;
