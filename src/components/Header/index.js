/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef, useContext } from 'react';

import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/fpt logo 1.jpg';
import AuthContext from '../../contexts/auth';
import { useClickOutside } from '../../hooks';
import { getTokenInfo } from '../../utils/account';
import {
    HContainer,
    HLogo,
    HIcons,
    NotiNews,
    HLink,
    NotificationContainer,
    NotificationHeader,
    NotificationBody,
    NotiContainer,
    NotiInfo,
    BtnContainer,
    NotiTarget,
    UserContainer,
} from './style';

import ForumIcon from '@mui/icons-material/Forum';
import InboxIcon from '@mui/icons-material/Inbox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { io } from 'socket.io-client';

const Header = () => {
    const [isNotiOpen, setNotiOpen] = useState(false);
    const [isUserOpen, setUserOpen] = useState(false);

    const [socket, setSocket] = useState(null);

    const [list, setList] = useState([]);

    const [newNoti, setNewNoti] = useState(0);

    const notiRef = useRef();
    const userRef = useRef();

    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    useClickOutside(notiRef, () => {
        if (isNotiOpen == true) {
            setNotiOpen(false);
        }
    });

    useClickOutside(userRef, () => {
        if (isUserOpen == true) {
            setUserOpen(false);
        }
    });

    const user = getTokenInfo();

    useEffect(() => {
        const socket = io('ws://8.tcp.ngrok.io:14651', {
            extraHeaders: {
                Authorization: localStorage.getItem('token'),
            },
        });

        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };

        setInterval(() => {
            axios
                .get(process.env.REACT_APP_API_URL + '/subjects', { headers: header })
                .then((subs) => {
                    console.log(subs);
                });
        }, 300000);

        socket.emit('notifications', {});

        socket.on('notifications', (e) => {
            if (Array.isArray(e)) {
                setList((list) => list.concat(e));
                setNewNoti((noti) => noti + e.length);
            } else {
                setList((list) => list.concat(JSON.parse(e)));
                setNewNoti((noti) => noti + 1);
            }
        });
        socket.on('disconnect', (e) => {
            console.log('disconnect');
        });
        socket.on('connect', (e) => {
            console.log('connected');
        });

        setSocket(socket);

        return () => socket.close();
    }, [setSocket]);

    const switchRole = () => {
        console.log(user);
        if (user.role == 'Lecturer') {
            localStorage.setItem(
                'token',
                'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtpZW5mcGxtcy5mZUBnbWFpbC5jb20iLCJyb2xlIjoiU3R1ZGVudCIsIm5iZiI6MTY1NjMzNDAyNywiZXhwIjoxNjU2OTM4ODI3LCJpYXQiOjE2NTYzMzQwMjd9.xVU6e2-54faeT40UZ9Hx1rkIaTJASdVDYfXKqJ5UdoU'
            );
        } else {
            localStorage.setItem(
                'token',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpZW5mcGxtcy5mZUBnbWFpbC5jb20iLCJyb2xlIjoiTGVjdHVyZXIiLCJuYmYiOjE2NTYzMzQwMjcsImV4cCI6MTY1NjkzODgyNywiaWF0IjoxNjU2MzM0MDI3fQ.dDgmEZOda447QPelcI_vDIyotnKB8lkbQ0Fe_wGVnLA'
            );
        }
    };

    return (
        <div>
            <HContainer>
                <HLogo>
                    <img src={logo} alt="FPT Logo" />
                </HLogo>
                <HIcons>
                    <BtnContainer ref={userRef}>
                        <PersonIcon
                            onClick={(e) => {
                                setUserOpen((userOpen) => !userOpen);
                            }}
                        />
                        <UserContainer isOpen={isUserOpen}>
                            <NotiInfo
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    auth.setAuth(false);
                                    navigate('/login');
                                }}
                            >
                                Logout
                            </NotiInfo>
                        </UserContainer>
                    </BtnContainer>
                    <BtnContainer>
                        <ForumIcon
                            onClick={switchRole}
                            style={{
                                fontSize: 24,
                                color: '#5680F9',
                                backgroundColor: '#DDE6FE',
                                borderRadius: '50%',
                                padding: '8px',
                                margin: '0 10px',
                            }}
                        />
                    </BtnContainer>
                    <BtnContainer ref={notiRef}>
                        <NotificationsIcon
                            onClick={(e) => {
                                setNewNoti(0);
                                setNotiOpen((e) => !e);
                            }}
                        />
                        <NotiNews isDisplay={newNoti > 0}>{newNoti}</NotiNews>
                        <NotificationContainer isOpen={isNotiOpen}>
                            <NotificationHeader>Notification</NotificationHeader>
                            <NotificationBody>
                                {list.map((noti) => (
                                    <>
                                        <NotiContainer key={noti.id}>
                                            {/* <InboxIcon /> */}
                                            <NotiInfo>
                                                <small>{noti.userEmail}</small>
                                                <div>{noti.title}</div>
                                                <small>{moment(noti.createAt).fromNow()}</small>
                                            </NotiInfo>
                                        </NotiContainer>
                                    </>
                                ))}
                            </NotificationBody>
                        </NotificationContainer>
                    </BtnContainer>
                </HIcons>
            </HContainer>
        </div>
    );
};

export default Header;
