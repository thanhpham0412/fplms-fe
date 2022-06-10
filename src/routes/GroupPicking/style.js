import styled from 'styled-components';

import { COLOR } from '../../utils/color';

const Container = styled.div`
    * {
        box-sizing: border-box;
    }
    max-width: 100%;
`;

const Banner = styled.div`
    width: 100%;
    height: 350px;
    background-color: ${COLOR.blue[2]};
    border-radius: 8px;
`;
const GroupLabel = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;
`;

const Title = styled.div`
    font: 1rem;
    font-family: Lato;
    text-transform: uppercase;
    color: ${COLOR.gray[0]};
`;

const CreateGroupBtn = styled.button`
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${COLOR.primary02};
    background-color: ${COLOR.blue[1]};
    border: none;
    border-radius: 4px;
    padding: 12px 35px;
    :hover {
        cursor: pointer;
    }
`;

const GroupList = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: fix-content;
    gap: 20px;
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

export { Banner, Container, Title, GroupList, GroupLabel, CreateGroupBtn };
