import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import smImg1 from '../../assets/LoginHero/image 2.png';
import smImg2 from '../../assets/LoginHero/image 3.png';
import { Particles, BigImg, SmallImg } from '../../components';
import {
    GoogleButton,
    StyledContainer,
    StyledTitle,
    StyledWelcome,
    StyledParagraph,
    ParticlesContainer,
    ImageGroup,
    StyledForm,
} from './style';

const Login = ({ setAuth }) => {
    const navigate = useNavigate();

    document.title = 'Login';

    const URL = process.env.REACT_APP_API_URL + '/auth/accounts/';

    const responseGoogle = (response) => {
        axios
            .post(URL, {
                idToken: response.tokenId,
                provider: 'GOOGLE',
            })
            .then(() => {
                setAuth(true);
                navigate('/class-list');
            })
            .catch(() => {
                setAuth(true);
                navigate('/class-list');
            });
    };

    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <>
            <StyledContainer>
                <StyledForm>
                    <StyledTitle>
                        <span>F</span>PLMS
                    </StyledTitle>
                    <StyledWelcome>Welcome to FPLMS</StyledWelcome>
                    <StyledParagraph>You are just one step away from your projects</StyledParagraph>
                    <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        disabledStyle
                        render={(btn) => (
                            <GoogleButton onClick={btn.onClick}>
                                Sign in with FPT email
                            </GoogleButton>
                        )}
                    />
                    <StyledParagraph isBold>
                        By logging in, you accept with our <span>Terms & Conditions</span>
                    </StyledParagraph>
                </StyledForm>
                <ImageGroup>
                    <BigImg />
                    <SmallImg timing={10} bottom={150} left={1} src={smImg2}></SmallImg>
                    <SmallImg timing={15} bottom={100} right={1} src={smImg1}></SmallImg>
                </ImageGroup>
            </StyledContainer>
            <ParticlesContainer>
                <Particles />
            </ParticlesContainer>
        </>
    );
};

export default Login;
