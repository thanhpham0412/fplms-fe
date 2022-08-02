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

    const [rows, setRows] = useState([]);

    const [cell, setCell] = useState(0);

    useEffect(() => {
        // get(`/classes/${classId}/students`).then((response) => {
        //     if (response.status == 200 && response.data.code == 200) {
        //         const data = response.data.data;
        //         data.forEach((student) => {
        //             get(`/cycle-reports`, { classId: classId }).then((res) => {
        //                 if (res.status == 200 && res.data.code == 200) {
        //                     const reports = res.data.data;
        //                     setRows((rows) => {
        //                         if (reports.length > cell) {
        //                             setCell(reports.length);
        //                         }
        //                         return {
        //                             ...rows,
        //                             [student.id]: {
        //                                 marks: reports.map((report) => report.mark),
        //                                 group: student.groupNumber,
        //                                 name: student.name,
        //                             },
        //                         };
        //                     });
        //                 }
        //             });
        //         });
        //     }
        // });

        const students = get(`/classes/${classId}/students`);
        const reports = get(`/cycle-reports`, { classId: classId });

        Promise.all([students, reports]).then(([students, reports]) => {
            const studentList = students.data.data;
            const reportList = reports.data.data;

            const matcher = (groupId) => {
                return reportList.filter((report) => report.groupId == groupId);
            };

            const _list = studentList.map((student) => {
                const mark = student.groupId ? matcher(student.groupId) : [];

                if (mark.length > cell) {
                    setCell(mark.length);
                }

                return {
                    ...student,
                    mark,
                };
            });

            console.log(_list);

            setRows(_list);
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
                    {rows.map((student) => {
                        return (
                            <TableRow key={student.id}>
                                <TableCell component="th" scope="row">
                                    {student.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {student.groupNumber ? 'Group' + student.groupNumber : '-'}
                                </TableCell>
                                {student.mark &&
                                    student.mark.map((mark, index) => (
                                        <TableCell align="center" key={index}>
                                            {mark.mark}
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
