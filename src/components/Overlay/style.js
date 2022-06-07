import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    display: ${({ isDisplay }) => (isDisplay == true ? 'block' : 'none')};
`;
