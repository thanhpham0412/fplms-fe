import styled from 'styled-components';

export const StyledTable = styled.table`
    width: 100%;
    overflow: auto;
    height: fit-content;

    [data-target='row'] {
    }
`;

export const StyledHeader = styled.tr`
    font-weight: bold;
    gap: 1rem;
    padding: 1rem;
    box-sizing: border-box;
    padding: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fff;
`;

export const StyledRow = styled.tr`
    box-sizing: border-box;
    font-size: 1rem;
    padding: 0rem 1.5rem;
    border-radius: 2px;
    align-items: center;
    max-height: 60px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    gap: 1rem;
    height: fit-content;
    transition: all 0.3s;
    cursor: pointer;
    color: #434343;

    :hover {
        background: #f1f1f1;
    }
`;
