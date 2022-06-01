import styled from 'styled-components';

const GContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 8px 16px;
    background: #eef2ff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    margin: 10px 0;
    text-align: left;
`;

const GHeader = styled.div`
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    color: #434343;
    margin-bottom: 0.5rem;
`;

const GProject = styled.div`
    color: #8b8b8b;
    font-weight: 400;
    font-size: 16px;
    text-transform: uppercase;
    margin: 0.5em 0;
`;

const GMember = styled.div`
    font-weight: 400;
    font-size: 14px;
    color: #7799fa;
    margin-bottom: 0.5em;
`;

const GFooter = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const GButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 16px;
    width: 64px;
    height: 25px;
    background: ${(props) => props.bg};
    border-radius: 4px;
    border: none;
    text-transform: uppercase;
    font-size: 14px;
    color: #ffffff;
    margin-right: 10px;
    :hover {
        cursor: pointer;
    }
`;

const GContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0.5em;
`;
const GText = styled.div`
    font-size: 1rem;
    color: #888888;
`;

export { GContainer, GHeader, GProject, GMember, GFooter, GButton, GContent, GText };
