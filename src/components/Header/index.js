import logo from '../../assets/fpt logo 1.jpg';
import { HContainer, HLogo, HIcons, HLink } from './style';

import ForumIcon from '@mui/icons-material/Forum';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
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
                    <HLink to={'/discussion-list'}>
                        <ForumIcon
                            style={{
                                fontSize: 24,
                                color: '#5680F9',
                                backgroundColor: '#DDE6FE',
                                borderRadius: '50%',
                                padding: '8px',
                            }}
                        />
                    </HLink>
                </HIcons>
            </HContainer>
        </div>
    );
};

export default Header;
