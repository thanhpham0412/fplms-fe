import styled from 'styled-components';

import { COLOR } from '../../utils/style';

/* const fadeIn = keyframes`
    0% {
    background:rgba(0,0,0,.0);
  }
  100% {
    background:rgba(0,0,0,.7);
  }
`;

const fadeOut = keyframes`
    0% {
    background:rgba(0,0,0,.7);
  }
  100% {
    background:rgba(0,0,0,.0);
  }
`;

const scaleUp = keyframes`
0% {
    transform:scale(.8) translateY(1000px);
    opacity:0;
  }
  100% {
    transform:scale(1) translateY(0px);
    opacity:1;
  }
`;

const scaleDown = keyframes`
0% {
    transform:scale(1) translateY(0px);
    opacity:1;
  }
  100% {
    transform:scale(.8) translateY(1000px);
    opacity:0;
  }
`;

const scaleBack = keyframes`
    0% {
    transform:scale(1);
  }
  100% {
    transform:scale(.85);
  }
`;

const quickScaleDown = keyframes`
    0% {
    transform:scale(1);
  }
  99.9% {
    transform:scale(1);
  }
  100% {
    transform:scale(0);
  }
`;

const scaleForward = keyframes`
    0% {
    transform:scale(.85);
  }
  100% {
    transform:scale(1);
  }
`;
&.two {
    transform: scale(1);
    .modal-background {
        background: rgba(0, 0, 0, 0);
        animation: ${fadeIn} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        .modal {
            opacity: 0;
            animation: ${scaleUp} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
    }
    + .content {
        animation: ${scaleBack} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    &.out {
        animation: ${quickScaleDown} 0s 0.5s linear forwards;
        .modal-background {
            animation: ${fadeOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            .modal {
                animation: ${scaleDown} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
        }
        + .content {
            animation: ${scaleForward} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
    }
} */

export const Wrapper = styled.div`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    height: 200px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
`;

export const Avatar = styled.div`
    position: absolute;
    top: 0;
    left: 15px;
    img {
        width: 140px;
        height: auto;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
`;

export const Content = styled.div`
    width: 450px;
    height: 180px;
    background-color: ${COLOR.primary02};
    display: grid;
    grid-template-columns: auto 1fr;
    border-radius: 24px;
    box-shadow: 5px 10px black;
`;

export const Left = styled.div`
    width: 175px;
`;

export const Right = styled.div`
    width: 100%;
    padding: 35px 0;
    color: ${COLOR.primary03};
`;

export const Label = styled.div`
    font-size: ${({ fS }) => fS || '1rem'};
    font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
    margin-bottom: 20px;
    svg {
        font-size: 30px;
    }
`;

export const Infomation = styled.div`
    margin: 5px 0;
    font-size: 1.2rem;
    font-style: italic;
`;
