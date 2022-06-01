import styled from 'styled-components';

const StyledContainer = styled.div`
    max-width: 1100px;
    position: relative;
    * {
        box-sizing: border-box;
    }
`;

const StHeader = styled.div`
    width: 100%;
    height: 50px;
    margin: 20px 0;
    display: flex;
    align-items: center;
`;

const StFilterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const StFilterColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 15px;
`;

const StFilterLabel = styled.div`
    font-size: 12px;
    margin: 10px 0;
    color: #434343;
`;

const StSerachBox = styled.input`
    max-height: 40px;
    padding: 0.8rem;
    background-color: #eef2ff;
    border-radius: 4px;
    border: 1px solid #99b3fb;
    color: #8b8b8b;
    font-size: 1rem;
`;

const StFilterBox = styled.div`
    max-height: 40px;
    padding: 0.8rem;
    background-color: #eef2ff;
    border-radius: 4px;
    border: 1px solid #99b3fb;
    color: #8b8b8b;
    font-size: 1rem;
    display: flex;
    align-items: center;
    svg {
        width: 1.4rem;
        height: 1.4rem;
        padding: 1px;
        margin: 0 5px;
        background-color: #bbccfd;
        border-radius: 50%;
        path {
            color: #666666;
        }
    }
`;

const StFilterLeft = styled.div`
    display: flex;
    align-items: center;
`;

const StFilterRight = styled.div`
    display: flex;
    align-items: center;
`;

const SettingBtn = styled.div`
    max-height: 40px;
    display: flex;
    align-items: center;
    background: #7799fa;
    border-radius: 4px;
    padding: 0.8rem;
    font-size: 14px;
    color: #ffffff;
    svg {
        margin-right: 0.7rem;
    }
    :hover {
        cursor: pointer;
    }
`;
const StudentListContainer = styled.div`
    max-width: 100%;
    margin: 10px 0;
`;
const StLogo = styled.div`
    width: 50px;
    height: 50px;
    background: #5680f9;
    border-radius: 4px;
    margin-right: 0.6rem;
`;
const StHeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const StClass = styled.div`
    font-size: 1rem;
    color: #7799fa;
`;

const StHeaderTitle = styled.div`
    font-weight: 700;
    font-size: 1.4rem;
    color: #5680f9;
`;

const TableContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Table = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 5px;
`;

const THead = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: #8b8b8b;
`;

const TRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    background-color: #eef2ff;
`;

const TColumn = styled.div`
    color: #434343;
    text-align: left;
`;

const TBody = styled.div`
    width: 100%;
    display: grid;
    row-gap: 5px;
`;

const TableCell = styled.div`
    padding: 1rem;
    font-size: 1rem;
`;

export {
    StyledContainer,
    StFilterBox,
    StFilterColumn,
    StFilterContainer,
    StFilterLabel,
    StHeader,
    StSerachBox,
    StFilterLeft,
    StFilterRight,
    SettingBtn,
    StudentListContainer,
    StHeaderContent,
    StClass,
    StLogo,
    StHeaderTitle,
    TableContainer,
    Table,
    THead,
    TBody,
    TColumn,
    TRow,
    TableCell,
};
