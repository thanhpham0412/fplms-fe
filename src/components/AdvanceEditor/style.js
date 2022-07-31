import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Avatar = styled.li`
    height: ${({ size }) => size || 49}px;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    position: relative;
    width: ${({ size }) => size - 7 || 42}px;

    img,
    span {
        background: ${({ color }) => color || '#596376'};
        border: 2px solid #fff;
        border-radius: 100px 100px 100px 100px;
        color: #ffffff;
        display: block;
        font-family: Lato;
        font-size: 10px;
        height: ${({ size }) => size - 4 || 45}px;
        line-height: ${({ size }) => size - 4 || 45}px;
        text-align: center;
        width: ${({ size }) => size - 4 || 45}px;
    }
`;

export const Container = styled.div`
    padding: 6rem 12rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    gap: 0.5rem;
    display: grid;
    position: relative;
    grid-template-rows: 80px 1fr;
`;

export const EditorSideBar = styled.div`
    min-width: 400px;
    max-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 0.5rem;
`;

export const Header = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    display: none;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const BackBtn = styled.div`
    border: none;
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: bold;
    cursor: pointer;

    :hover {
        svg {
            fill: ${COLOR.red[0]};
        }
        color: ${COLOR.red[0]};
    }

    transition: all 0.3s;
    * {
        transition: all 0.3s;
    }
`;

export const GroupAvatar = styled.ul`
    display: flex;
    list-style-type: none;
    padding: 0px 7px 0px 0px;
    z-index: 1;
`;

export const BottomSide = styled.div`
    width: 100%;
    max-height: 100%;
    overflow: auto;
    display: flex;
    gap: 0.5rem;
`;

export const EditorContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 1in;
    overflow: auto;
    cursor: text;
    background: #fff;
`;
