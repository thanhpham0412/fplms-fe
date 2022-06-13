import { useEffect, useState } from 'react';

import axios from 'axios';

import { StudentRow } from '../../components';
import {
    StyledContainer,
    StHeader,
    StFilterColumn,
    StFilterLabel,
    StSerachBox,
    StFilterBox,
    StFilterContainer,
    StFilterLeft,
    StFilterRight,
    SettingBtn,
    StudentListContainer,
    StHeaderContent,
    StClass,
    StLogo,
    StHeaderTitle,
    THead,
    TRow,
    TBody,
    TableContainer,
    Table,
    TableCell,
} from './style';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';

const StudentList = () => {
    document.title = 'StudentList';
    const createData = (studentName, studentID, groupName, role, reports, action) => {
        return { studentName, studentID, groupName, role, reports, action };
    };
    const [rows] = useState([
        createData('Quach Heng To Ni', 'SE161101', 'Group 1', 'Leader', 32, 'Remove'),
        createData('Mai Thanh Phuong', 'SE161100', 'Group 1', 'Member', 32, 'Remove'),
        createData('Tran Nhat Hoang', 'SE161102', 'Group 1', 'Member', 32, 'Remove'),
        createData('Nguyen Thanh Kien', 'SE161103', 'Group 1', 'Member', 32, 'Remove'),
        createData('Pham Trong Thanh', 'SE161104', 'Group 1', 'Member', 32, 'Remove'),
        createData('Vuong Tran Dieu Anh', 'SE161105', 'Group 2', 'Member', 32, 'Remove'),
        createData('Nguyen Dang Khoa', 'SE161106', 'Group 2', 'Member', 32, 'Remove'),
        createData('Nguyen Duc Thien', 'SE161107', 'Group 2', 'Member', 32, 'Remove'),
        createData('Duong Chi Khang', 'SE161108', 'Group 2', 'Member', 32, 'Remove'),
    ]);

    const API = process.env.REACT_APP_API_URL + `/management/classes/2/student`;
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        axios.get(API, { headers: header }).then((res) => {
            const data = res.data;
            console.log(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [search, setSearch] = useState('');

    return (
        <>
            {/* <StyledModal></StyledModal> */}

            <StyledContainer>
                <StHeader>
                    <StLogo />
                    <StHeaderContent>
                        <StHeaderTitle>Student List</StHeaderTitle>
                        <StClass>SE1631</StClass>
                    </StHeaderContent>
                </StHeader>
                <StFilterContainer>
                    <StFilterLeft>
                        <StFilterColumn>
                            <StFilterLabel>Search Students</StFilterLabel>
                            <StSerachBox
                                type="text"
                                value={search}
                                placeholder="Search students by name..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </StFilterColumn>
                        <StFilterColumn>
                            <StFilterLabel>Roles</StFilterLabel>
                            <StFilterBox>
                                All Roles
                                <ExpandMoreIcon />
                            </StFilterBox>
                        </StFilterColumn>
                        <StFilterColumn>
                            <StFilterLabel>Group by</StFilterLabel>
                            <StFilterBox>
                                Group
                                <ExpandMoreIcon />
                            </StFilterBox>
                        </StFilterColumn>
                    </StFilterLeft>
                    <StFilterRight>
                        <StFilterColumn style={{ margin: 0 }}>
                            <StFilterLabel style={{ color: '#fff' }}>G</StFilterLabel>
                            <SettingBtn>
                                <SettingsIcon />
                                Save
                            </SettingBtn>
                        </StFilterColumn>
                    </StFilterRight>
                </StFilterContainer>

                {/* Student List Table */}
                <StudentListContainer>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <THead>
                                <TRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Group</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Reports</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TRow>
                            </THead>
                            <TBody>
                                {rows.map((studentInfo, index) => (
                                    <StudentRow key={index} {...studentInfo} />
                                ))}
                            </TBody>
                        </Table>
                    </TableContainer>
                </StudentListContainer>
            </StyledContainer>
        </>
    );
};

export default StudentList;
