/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import autumnBG from '../../assets/autumnBg.jpg';
import snowBG from '../../assets/snowbg.jpg';
import springBG from '../../assets/springBG.jpg';
import sunBG from '../../assets/sunBg.jpg';
import { Header } from '../../components';
import { useClickOutside } from '../../hooks';
import SemesterForm from './SemesterForm';
import {
    CardTitle,
    Container,
    LeftSetting,
    Loader,
    RightSetting,
    SemesterCard,
    SettingBody,
    SettingLabel,
    SettingTitle,
    Wrapper,
} from './style';

import EditIcon from '@mui/icons-material/Edit';

const AdminPage = () => {
    const [loading, setLoading] = useState(true);
    const [semesters, setSemesters] = useState();
    const [subjects, setSubjects] = useState();
    const [values, setValues] = useState();
    const [opts, setOpts] = useState([]);
    const [show, setShow] = useState(true);

    const [semester, setSemester] = useState();

    //Set form position
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [open, setOpen] = useState(false);

    const semesterRef = useRef();
    const subjectRef = useRef();

    const showSemesterSetting = () => {
        if (semesterRef.current.classList.contains('active')) {
            return;
        } else {
            setLoading(true);
            semesterRef.current.classList.add('active');
            subjectRef.current.classList.remove('active');
            setTimeout(() => {
                setLoading(false);
                setShow(true);
            }, 1000);
        }
    };
    const showSubjectSetting = () => {
        if (subjectRef.current.classList.contains('active')) {
            return;
        } else {
            setLoading(true);
            semesterRef.current.classList.remove('active');
            subjectRef.current.classList.add('active');
            setTimeout(() => {
                setLoading(false);
                setShow(false);
            }, 1000);
        }
    };

    const getPos = async (el, item) => {
        setWidth(el.clientWidth);
        setHeight(el.clientHeight);
        setSemester(item);
        let bodyRef = document.getElementById('setting-body');
        var tx = bodyRef.offsetLeft + bodyRef.clientWidth / 4;
        var ty = bodyRef.offsetTop + bodyRef.clientHeight / 4;
        setTo({ x: tx, y: ty });
        for (
            var fx = 0, fy = 0;
            el != null;
            fx += el.offsetLeft, fy += el.offsetTop, el = el.offsetParent
        );

        setFrom({ x: fx, y: fy });

        setOpen(true);
    };

    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/semesters`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });

                if (res.data.code === 200) {
                    await setSemesters(res.data.data);
                    console.log(res.data);
                    setSemesters(res.data.data);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSubjects = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/subjects`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });

                if (res.data.code === 200) {
                    await setSubjects(res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSemesters();
        fetchSubjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderSemesterSetting = () => {
        return (
            <>
                <SettingTitle>Semester</SettingTitle>
                <SettingBody id="setting-body">
                    {semesters?.map((item) => (
                        <SemesterCard
                            key={item.code}
                            onClick={(e) => getPos(e.currentTarget, item)}
                        >
                            <CardTitle>{item.code}</CardTitle>
                            <EditIcon className="edit-icon" />
                            <div>
                                Start Date: <span>{item.startDate}</span>
                            </div>
                            <div>
                                End Date: <span>{item.endDate}</span>
                            </div>
                        </SemesterCard>
                    ))}
                </SettingBody>
            </>
        );
    };

    const renderSubjectSetting = () => {
        return <div>Halo</div>;
    };

    const renderForm = () => {
        return (
            <SemesterForm
                semester={semester}
                open={open}
                setOpen={setOpen}
                w={width}
                h={height}
                from={from}
                to={to}
            />
        );
    };

    return (
        <>
            <Header />
            {open && renderForm()}
            <Wrapper>
                <Container>
                    <RightSetting>
                        <SettingLabel
                            className="active"
                            ref={semesterRef}
                            onClick={() => showSemesterSetting()}
                        >
                            Semester Settings
                        </SettingLabel>
                        <SettingLabel ref={subjectRef} onClick={() => showSubjectSetting()}>
                            <span>Subject Settings</span>
                        </SettingLabel>
                    </RightSetting>

                    <LeftSetting>
                        {loading ? (
                            <Loader />
                        ) : show ? (
                            renderSemesterSetting()
                        ) : (
                            renderSubjectSetting()
                        )}
                    </LeftSetting>
                </Container>
            </Wrapper>
        </>
    );
};

export default AdminPage;
