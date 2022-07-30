/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import { useClickOutside } from '../../../hooks';
import { error, success } from '../../../utils/toaster';
import { Wrapper, Container, Overlay, ButtonList, Button, SemsterCode, InputDate } from './style';

const SemesterForm = ({ open, setOpen, w, h, from, to, semester }) => {
    const formRef = useRef();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleDeleteSemester = async () => {
        try {
            const res = await axios.delete(
                `${process.env.REACT_APP_API_URL}/semesters/${semester.code}`,
                {
                    headers: { Authorization: `${localStorage.getItem('token')}` },
                }
            );
            await success(`Delete semester successfully!`);
            setOpen(false);
        } catch (err) {
            await error(err);
            setOpen(false);
        }
    };
    const handleEditSemester = async () => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/semesters`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
                params: {
                    code: semester.code,
                    endDate: endDate,
                    startDate: startDate,
                },
            });
            success(`Edit semester successfully`);
        } catch (err) {
            await error(err);
            await setOpen(false);
        }
    };

    // useClickOutside(formRef, () => {
    //     setOpen(false);
    //     document.querySelector('.form-wrapper').classList.remove('show-form');
    // });

    useEffect(() => {
        if (open) {
            document.querySelector('.form-wrapper').classList.add('show-form');
        }
    }, [open]);

    return (
        <>
            <Overlay
                onClick={() => {
                    setOpen(false);
                    document.querySelector('.form-wrapper').classList.remove('show-form');
                }}
            />
            <Wrapper
                ref={formRef}
                className="form-wrapper"
                open={open}
                w={w}
                from={from}
                to={to}
                h={h}
            >
                <Container>
                    <SemsterCode>{semester.code}</SemsterCode>
                    <InputDate>
                        <span>Start Date:</span>
                        <input
                            type={'date'}
                            defaultValue={semester.startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </InputDate>
                    <InputDate>
                        <span>Start Date:</span>
                        <input
                            type={'date'}
                            defaultValue={semester.endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </InputDate>
                    <ButtonList>
                        <Button onClick={handleEditSemester}>Save</Button>
                        <Button onClick={handleDeleteSemester}>Delete</Button>
                    </ButtonList>
                </Container>
            </Wrapper>
        </>
    );
};

export default SemesterForm;
