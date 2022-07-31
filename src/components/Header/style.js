import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { COLOR } from '../../utils/style';

const HContainer = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 1rem;
    position: fixed;
    top: 0;
    z-index: 5;
`;

const HLogo = styled.div`
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`;

const HIcons = styled.div`
    margin: 10px;
    display: flex;
    justify-content: space-between;
`;

const HLink = styled(Link)`
    text-decoration: none;
    border-radius: 50%;
    position: relative;
    :hover {
        cursor: pointer;
    }
`;
export const BtnContainer = styled.div`
    text-decoration: none;
    border-radius: 50%;
    position: relative;
    :hover {
        cursor: pointer;
    }
`;

export const NotificationContainer = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    width: 300px;
    height: 500px;
    padding: 1rem;
    right: 0px;
    top: 80px;
    border-radius: 2px;
    background: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const NotificationHeader = styled.div`
    font-weight: 900;
    margin: 0.5rem 0 1rem 0;
    font-size: 1.25rem;
    color: ${COLOR.blue[0]};
    letter-spacing: 0.05rem;
`;

export const NotificationBody = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

export const NotiContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    height: fit-content;

    svg {
        background: ${COLOR.blue[0]};
        padding: 0.8rem;
        fill: #fff;
        border-radius: 2px;
    }
`;

export const NotiInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
`;

export const NotiTarget = styled.div`
    color: ${COLOR.primary03};
    font-weight: bold;
`;

export const UserContainer = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    width: 300px;
    height: auto;
    padding: 1rem;
    right: 0px;
    top: 80px;
    border-radius: 2px;
    background: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export { HContainer, HLogo, HIcons, HLink };
