import bannerImg from '../../assets/header.png';
import { Footer, GroupContent, Header } from '../../components';
// import SideBar from '../../components/Sidebar';
import {
    Container,
    GBanner,
    GBannerTitle,
    GBannerContent,
    GBannerImg,
    GBannerBrief,
    Title,
    GroupListContainer,
    GJumbotron,
} from './style';

const GroupPicking = () => {
    return (
        <>
            <Header />
            {/* <SideBar /> */}
            <Container>
                <GBanner>
                    <GBannerContent>
                        <GBannerTitle>Project-based Learning Management System</GBannerTitle>
                        <GBannerBrief>Managing course more easily and covenient</GBannerBrief>
                    </GBannerContent>
                    <GBannerImg>
                        <img src={bannerImg} />
                    </GBannerImg>
                </GBanner>
                <GJumbotron>
                    <Title>GROUPS</Title>
                    <GroupListContainer>
                        <GroupContent currentMembers={0} maxMembers={'6'} role={'lecturer'} />
                        <GroupContent currentMembers={0} maxMembers={'6'} role={'lecturer'} />
                        <GroupContent currentMembers={0} maxMembers={'6'} role={'lecturer'} />
                        <GroupContent currentMembers={0} maxMembers={'6'} role={'lecturer'} />
                        <GroupContent currentMembers={0} maxMembers={'6'} role={'lecturer'} />
                        <GroupContent currentMembers={0} maxMembers={'6'} role={'lecturer'} />
                    </GroupListContainer>
                </GJumbotron>
                <Footer />
            </Container>
        </>
    );
};

export default GroupPicking;
