import styled from 'styled-components';

import { COLOR } from '../../utils/color';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    background-color: ${COLOR.blue[5]};
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

const Header = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 1rem;
    color: ${COLOR.primary03};
    margin-bottom: 8px;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    svg {
        color: ${COLOR.gray[0]};
        margin-right: 5px;
    }
`;

const Project = styled.div`
    font-size: 1rem;
    color: ${COLOR.gray[0]};
`;

const Members = styled.div`
    font-size: 1rem;
    color: ${COLOR.gray[0]};
`;

const GroupBtn = styled.button`
    padding: 4px 16px;
    border: none;
    border-radius: 4px;
    background-color: ${COLOR.blue[1]};
    text-transform: uppercase;
    font-size: 1rem;
    margin-right: 10px;
    margin-top: 8px;
    color: ${COLOR.primary02};
    :hover {
        cursor: pointer;
    }
`;

export const JoinBtn = styled.button`
    padding: 4px 16px;
    border: none;
    border-radius: 4px;
    background-color: ${COLOR.blue[1]};
    text-transform: uppercase;
    font-size: 1rem;
    margin-right: 10px;
    margin-top: 8px;
    color: ${COLOR.primary02};
    :hover {
        cursor: pointer;
    }
    pointer-events: ${({ disable }) => (disable ? 'none' : 'auto')};
`;

export { Container, Row, Header, Project, Members, GroupBtn };
