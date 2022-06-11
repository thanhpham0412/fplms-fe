import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { StyledContainer, StyledUL, StyledSection, StyledBlock } from './style';

import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SchoolIcon from '@mui/icons-material/School';

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
                    key={section.path + section.title}
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
            submenu: [],
        },
        {
            title: 'Class list',
            path: '/class-list',
            isExpand: true,
            icon: <SchoolIcon />,
            submenu: [
                {
                    title: 'My classes',
                    path: '/group-picking',
                    isExpand: true,
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
            path: '/discussion-list',
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
        <StyledContainer width="275px" height="100vh" padding="16px 0" position="fixed" shadow>
            <StyledContainer padding="0px">
                <Menu menu={menu} level={1} expand={true} setShow={setShow} />
            </StyledContainer>
        </StyledContainer>
    );
};

export default SideBar;
