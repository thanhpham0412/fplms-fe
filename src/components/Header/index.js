/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import logo from '../../assets/fpt logo 1.jpg';
import { getTokenInfo } from '../../utils/account';
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

    const [list, setList] = useState([]);

    const user = getTokenInfo();

    useEffect(() => {
        const socket = io('ws://6.tcp.ngrok.io:18815', {
            extraHeaders: {
                Authorization: localStorage.getItem('token'),
            },
        });

        socket.emit('notifications');

        socket.on('notifications', (e) => {
            console.log('receive new notifications');
            console.log(e);
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
                    <BtnContainer>
                        <NotificationsIcon
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
