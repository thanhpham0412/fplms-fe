import { Round, Star, Container } from './style';

import SearchIcon from '@mui/icons-material/Search';

const RADIUS = 300;

const NoResult = ({ children }) => {
    const stars = new Array(0).fill('').map((k, i) => {
        const center = RADIUS / 2;
        const r = center * Math.sqrt(Math.random());
        const x = center + r * Math.cos(Math.random() * 2 * Math.PI);
        const y = center + r * Math.cos(Math.random() * 2 * Math.PI);
        return <Star key={k + i} position={{ x: x, y: y }} />;
    });
    return (
        <Container>
            <Round>
                {stars}
                <SearchIcon />
            </Round>
            {children}
        </Container>
    );
};

export default NoResult;
