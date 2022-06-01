import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HContainer = styled.header`
    width: 100%;
    max-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.25);
`;

const HLogo = styled.div`
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
    margin: 10px;
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
