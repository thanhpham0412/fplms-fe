import styled, { keyframes } from 'styled-components';

import { COLOR } from '../../utils/style';

const loader = keyframes`
    from{
        transform: rotate(1turn);
    }
    to{
        transform: rotate(2turn);
    }
`;

export const Wrapper = styled.div`
    * {
        box-sizing: border-box;
    }
    max-width: 100vw;
    height: 100vh;
    padding: 0 18vw;
    padding-top: 120px;
    background-color: ${COLOR.gray[1]};
    position: relative;
    @media (max-width: 992px) {
        padding-left: 6vw;
        padding-right: 6vw;
    }
    @media (max-width: 900px) {
        padding: 120px 0 1vw;
    }

    .active {
        color: ${COLOR.primary02};
        background-color: ${COLOR.blue[0]};
    }
`;

export const Container = styled.div`
    width: 100%;
    min-height: 500px;
    min-width: 800px;
    border-radius: 8px;
    background-color: ${COLOR.primary02};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    overflow: hidden;
`;

export const RightSetting = styled.div`
    width: 25%;
    height: 1fr;
    min-width: fit-content;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding: 3vw 0;
    padding-left: 15px;
    padding-right: 30px;
    font-size: 1.2rem;
    gap: 20px;
    @media (max-width: 992px) {
        padding: 4vw 5vw 3vw 3vw;
        width: 25%;
    }
    @media (max-width: 768) {
        min-width: unset;
        padding: 4vw 5vw 3vw 3vw;
        width: 25%;
    }
`;
export const LeftSetting = styled.div`
    width: 70%;

    height: 1fr;
    flex-grow: 1;
    padding: 3vw;
    position: relative;
`;
export const SettingBody = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
`;

export const SettingTitle = styled.div`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 20px;
`;
export const SettingLabel = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    border-radius: 100px;
    :hover {
        color: ${COLOR.primary02};
        background-color: ${COLOR.blue[0]};
    }

    cursor: pointer;
`;

export const Loader = styled.div`
    position: absolute;
    width: 100px;
    height: 100px;
    border: 10px solid transparent;
    border-radius: 50%;
    border-top-color: ${COLOR.blue[0]};
    animation: ${loader} 1s ease-in-out infinite;

    top: 20%;
    right: 0;
    left: 0;
    margin: auto;
`;

export const SemesterCard = styled.div`
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 4px;
    overflow: hidden;
    background: linear-gradient(
        135deg,
        rgba(153, 179, 251, 1) 0%,
        rgba(184, 202, 252, 1) 29%,
        rgba(195, 210, 253, 1) 61%,
        rgba(238, 242, 255, 1) 100%
    );
    min-height: 120px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 15px;
    position: relative;
    cursor: pointer;
    transition: transform 200ms ease-in-out;
    color: ${COLOR.primary02};
    :hover {
        transform: scale(1.05);
    }
    .edit-icon {
        position: absolute;
        top: 15px;
        right: 15px;
        color: ${COLOR.primary02};
    }
    & span {
        margin-left: 20px;
    }
`;

export const CardTitle = styled.h3`
    font-weight: 400;
    font-size: 1rem;
    color: ${COLOR.primary02};
    margin: 0;
`;
