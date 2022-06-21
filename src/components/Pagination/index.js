import { useState } from 'react';

import { Container, PageBlock } from './style';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Pagination = ({ setPageNum, pageSize, totalPosts }) => {
    const [isActive, setActive] = useState(false);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / pageSize); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            <Container number={pageNumbers.length}>
                <ArrowBackIosNewIcon />
                {pageNumbers.map((pageNum, index) => (
                    <PageBlock
                        key={index}
                        isActive={isActive}
                        onClick={() => {
                            setPageNum(pageNum), setActive(true);
                        }}
                    >
                        {pageNum}
                    </PageBlock>
                ))}
                <ArrowForwardIosIcon />
            </Container>
        </>
    );
};

export default Pagination;
