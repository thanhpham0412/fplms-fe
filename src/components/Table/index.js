import { StyledRow, StyledHeader, StyledTable } from './style';

const Table = ({ columns, children }) => {
    return <StyledTable columns={columns}>{children}</StyledTable>;
};

const Row = ({ children }) => {
    return <StyledRow data-target="row">{children}</StyledRow>;
};

const TableHeader = ({ children }) => {
    return <StyledHeader data-target="row">{children}</StyledHeader>;
};

export default Table;

export { Row, TableHeader };
