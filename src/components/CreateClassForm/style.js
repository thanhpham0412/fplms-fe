import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    width: 600px;
    height: auto;
    background: green;
    z-index: 10;
    border-radius: 2px;
    background: ${COLOR.primary02};
    box-shadow: ${COLOR.blue[3]} 0px 4px 12px;
    display: block;

    * {
        box-sizing: border-box;
    }
`;

export const StyledHeader = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${COLOR.gray[2]};

    svg {
        box-sizing: border-box;
        padding: 4px;
        width: 2rem;
        height: 2rem;
        background: ${COLOR.red[0]};
        border-radius: 4px;
        fill: ${COLOR.primary02};
        cursor: pointer;
    }
`;

export const DataHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Error = styled.small`
    color: ${COLOR.red[0]};
`;

export const StyledBody = styled.div`
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    box-sizing: border-box;
    display: flex;
`;

export const StyledJumbotron = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const Title = styled.div`
    font-weight: 900;
    letter-spacing: 0.05rem;
    color: ${COLOR.primary03};
`;

export const SubTitle = styled.div`
    color: ${COLOR.gray[0]};
`;

export const Row = styled.div`
    display: flex;
    gap: 16px;
`;

export const StyledInput = styled.input`
    border-radius: 2px;
    border: 1px solid ${COLOR.blue[0]};
    outline: none;
    padding: 1rem;
    font-family: Lato;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    min-height: 51px;
    transition: all 300ms;

    :focus {
        border: 1px solid ${COLOR.blue[0]};
        background: ${COLOR.blue[5]};
    }
`;

export const Col = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
`;

export const StyledSelection = styled.input`
    border-radius: 4px;
    background: ${COLOR.blue[5]};
    outline: none;
    border: none;
    display: flex;
    padding: 1rem;
`;

export const StyledButton = styled.button`
    background: ${COLOR.blue[0]};
    font-weight: 900;
    color: white;
    border: none;
    width: 100%;
    height: 51px;
    letter-spacing: 0.05px;
    font-family: Lato;
    border-radius: 4px;
    cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};
    opacity: ${({ disable }) => (disable ? 0.8 : 1)};

    div {
        margin: 0 auto;
    }
`;
