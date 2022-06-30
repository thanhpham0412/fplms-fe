/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import logo from '../../assets/fpt logo 1.jpg';
import {
    HContainer,
    HLogo,
    HIcons,
    HLink,
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
import NotificationsIcon from '@mui/icons-material/Notifications';
import { io } from 'socket.io-client';

const Header = () => {
    const [isOpen, setOpen] = useState(false);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io('ws://2.tcp.ngrok.io:17900', {
            extraHeaders: {
                Authorization: localStorage.getItem('token'),
            },
        });

        socket.emit('notifications');

        socket.on('notifications', (e) => console.log(e));
        socket.on('disconnect', (e) => {
            console.log('disconnect');
        });
        socket.on('connect', (e) => {
            console.log('connected');
        });

        setSocket(socket);

        return () => socket.close();
    }, [setSocket]);

    return (
        <div>
            <HContainer>
                <HLogo>
                    <img src={logo} alt="FPT Logo" />
                </HLogo>
                <HIcons>
                    <HLink to={'/studentList'}>
                        <NotificationsIcon
                            style={{
                                fontSize: 24,
                                color: '#5680F9',
                                backgroundColor: '#DDE6FE',
                                borderRadius: '50%',
                                padding: '8px',
                                margin: '0 10px',
                            }}
                        />
                    </HLink>
                    <BtnContainer>
                        <ForumIcon
                            style={{
                                fontSize: 24,
                                color: '#5680F9',
                                backgroundColor: '#DDE6FE',
                                borderRadius: '50%',
                                padding: '8px',
                            }}
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
        </div>
    );
};

export default Header;
