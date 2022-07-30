/* eslint-disable no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { get } from '../../utils/request';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(studentName, groupId, mark, id) {
    return { studentName, groupId, mark, id };
}

function MarkTable() {
    const { classId } = useParams();

    const [rows, setRows] = useState({});

    const [cell, setCell] = useState(0);

    useEffect(() => {
        get(`/classes/${classId}/students`).then((response) => {
            if (response.status == 200 && response.data.code == 200) {
                const data = response.data.data;
                data.forEach((student) => {
                    get(`/cycle-reports`, { classId: classId }).then((res) => {
                        if (res.status == 200 && res.data.code == 200) {
                            const reports = res.data.data;
                            setRows((rows) => {
                                if (reports.length > cell) {
                                    setCell(reports.length);
                                }
                                return {
                                    ...rows,
                                    [student.id]: {
                                        marks: reports.map((report) => report.mark),
                                        group: student.groupNumber,
                                        name: student.name,
                                    },
                                };
                            });
                        }
                    });
                });
            }
        });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell align="left">Group</TableCell>
                        {new Array(cell).fill('').map((cell, index) => (
                            <TableCell align="center" key={index}>
                                Cycle {index + 1}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(rows).map((studentId) => {
                        return (
                            <TableRow
                                key={studentId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {rows[studentId].name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    Group {rows[studentId].group}
                                </TableCell>
                                {rows[studentId].marks.map((mark, index) => (
                                    <TableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                        key={index}
                                    >
                                        {mark}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MarkTable;
