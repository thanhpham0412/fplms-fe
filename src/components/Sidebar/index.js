import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    StyledContainer,
    StyledJumbotron,
    StyledLine,
    StyledUL,
    StyledSection,
    StyledBlock,
} from './style';

import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';

const Section = ({ section, level, setShow }) => {
    const navigate = useNavigate();

    const collapse = () => {
        if (section.path) {
            navigate(section.path);
        }
        setShow(section, true);
    };

    return (
        <li>
            <StyledSection onClick={collapse} expand={section.isExpand || false}>
                {section.icon ? section.icon : <span />}
                <StyledBlock expand={section.isExpand || false}>
                    <span>{section.title}</span>
                    {section.submenu.length ? <KeyboardArrowDownIcon /> : null}
                </StyledBlock>
            </StyledSection>
            {section.submenu ? (
                <Menu
                    setShow={setShow}
                    expand={section.isExpand}
                    level={level + 2.5}
                    menu={section.submenu}
                />
            ) : null}
        </li>
    );
};

const Menu = ({ menu, level, expand, setShow }) => {
    return (
        <StyledUL level={level} expand={expand} height={level == 1 ? 'auto' : menu.length * 56}>
            {menu.map((section) => (
                <Section
                    setShow={setShow}
                    key={section.path || section.title}
                    section={section}
                    level={level}
                />
            ))}
        </StyledUL>
    );
};

const SideBar = () => {
    const [menu, setMenu] = useState([
        {
            title: 'Home',
            path: '#',
            icon: <HomeIcon />,
            isExpand: true,
            submenu: [],
        },
        {
            title: 'Class list',
            path: '#',
            icon: <SchoolIcon />,
            submenu: [
                {
                    title: 'My classes',
                    path: '#',
                    submenu: [],
                },
                {
                    title: 'All classes',
                    path: '#',
                    submenu: [],
                },
            ],
        },
        {
            title: 'Discussion',
            path: '#',
            icon: <ForumIcon />,
            submenu: [
                {
                    title: 'My question',
                    path: '#',
                    submenu: [],
                },
                {
                    title: 'My answers',
                    path: '#',
                    submenu: [],
                },
            ],
        },
        {
            title: 'Settings',
            path: '#',
            icon: <SettingsIcon />,
            submenu: [],
        },
    ]);

    const setShow = (target, status = false) => {
        const switchMenu = (sections) => {
            sections.forEach((sub) => {
                sub.isExpand = false;
                if (target == sub || sub.submenu.includes(target)) {
                    sub.isExpand = status;
                }
                if (sub.isExpand == true) {
                    switchMenu(sub.submenu);
                }
            });
            return sections;
        };

        setMenu(switchMenu(menu));
    };

    return (
        <StyledContainer width="250px" height="100vh" padding="16px 0" shadow position="fixed">
            <StyledContainer height="fit-content" padding="0 16px">
                <StyledJumbotron />
            </StyledContainer>
            <StyledLine />
            <StyledContainer padding="0px">
                <Menu menu={menu} level={1} expand={true} setShow={setShow} />
            </StyledContainer>
        </StyledContainer>
    );
};

export default SideBar;
