/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import logo from '../../assets/fpt logo 1.jpg';
import AuthContext from '../../contexts/auth';
import {
    HContainer,
    HLogo,
    HIcons,
    NotificationContainer,
    NotificationHeader,
    NotificationBody,
    NotiContainer,
    NotiInfo,
    BtnContainer,
    NotiTarget,
} from './style';

import ForumIcon from '@mui/icons-material/Forum';
import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { io } from 'socket.io-client';

const Header = () => {
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const auth = useContext(AuthContext);
    // useEffect(() => {
    //     const socket = io('ws://2.tcp.ngrok.io:17900', {
    //         extraHeaders: {
    //             Authorization: localStorage.getItem('token'),
    //         },
    //     });

    //     socket.emit('notifications');

    //     socket.on('notifications', (e) => console.log(e));
    //     socket.on('disconnect', (e) => {
    //         console.log('disconnect');
    //     });
    //     socket.on('connect', (e) => {
    //         console.log('connected');
    //     });

    //     setSocket(socket);

    //     return () => socket.close();
    // }, [setSocket]);

    const handleLogout = async () => {
        auth.setAuth(false);
        await localStorage.clear();
        navigate('/login');
    };

    return (
        <HContainer>
            <HLogo>
                <img src={logo} alt="FPT Logo" />
            </HLogo>
            <HIcons>
                <BtnContainer onClick={() => navigate('/studentList')}>
                    <NotificationsIcon />
                </BtnContainer>
                <BtnContainer onClick={() => handleLogout()}>
                    <LogoutIcon />
                </BtnContainer>
                <BtnContainer>
                    <ForumIcon
                        onClick={() => {
                            setOpen((e) => !e);
                            console.log('oen');
                        }}
                    />
                    <NotificationContainer isOpen={isOpen}>
                        <NotificationHeader>Notification</NotificationHeader>
                        <NotificationBody>
                            <NotiContainer>
                                <InboxIcon />
                                <NotiInfo>
                                    <NotiTarget>Kien answerd your question</NotiTarget>
                                    <div>Today</div>
                                </NotiInfo>
                            </NotiContainer>
                            <NotiContainer>
                                <InboxIcon />
                                <NotiInfo>
                                    <NotiTarget>Kien answerd your question</NotiTarget>
                                    <div>Today</div>
                                </NotiInfo>
                            </NotiContainer>
                            <NotiContainer>
                                <InboxIcon />
                                <NotiInfo>
                                    <NotiTarget>Kien answerd your question</NotiTarget>
                                    <div>Today</div>
                                </NotiInfo>
                            </NotiContainer>
                        </NotificationBody>
                    </NotificationContainer>
                </BtnContainer>
            </HIcons>
        </HContainer>
    );
};

export default Header;
