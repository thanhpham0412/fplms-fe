import styled, { keyframes } from 'styled-components';

const show = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const upDown = keyframes`
    from {
        transform: translateY(-150%);
    }
    to {
        transform: translateY(0);
    }
`;

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(3px);
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    animation: ${show} 300ms cubic-bezier(0.4, 0, 0.2, 1);
    display: ${({ isDisplay }) => (isDisplay == true ? 'block' : 'none')};

    > div {
        height: 100%;
        animation: ${upDown} 500ms cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
