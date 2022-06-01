import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px auto;
    padding: 0 25px;
`;

const GBanner = styled.div`
    max-width: inherit;
    max-height: 350px;
    background: #bcf0da;
    border-radius: 30px;
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    width: 100%;
    font-weight: 400;
    font-size: 1rem;
    color: #8b8b8b;
    margin-bottom: 1rem;
`;
const GBannerContent = styled.div`
    width: 40%;
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 30px;
    @media (max-width: 768px) {
        display: none;
    }
`;

const GBannerTitle = styled.p`
    font-weight: 400;
    font-size: 2.6rem;
    max-width: 420px;
    margin-bottom: 10%;
`;

const GBannerBrief = styled.p`
    color: #888888;
    font-weight: 400;
    font-size: 12px;
`;

const GBannerImg = styled.div`
    width: 60%;
    img {
        width: 100%;
        height: auto;
    }
    @media (max-width: 768px) {
        width: 100%;
        img {
            width: 100%;
            height: auto;
        }
    }
`;

const GroupListContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: fix-content;
    gap: 10px;

    @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`;

const GJumbotron = styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export {
    GBanner,
    Container,
    Title,
    GBannerContent,
    GBannerImg,
    GBannerTitle,
    GBannerBrief,
    GroupListContainer,
    GJumbotron,
};
