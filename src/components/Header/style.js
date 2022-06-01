import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    :hover {
        cursor: pointer;
    }
`;

export { HContainer, HLogo, HIcons, HLink };
