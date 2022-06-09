/* eslint-disable no-useless-escape */
import { useRef } from 'react';

import { Container, StyledInput } from './style';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const InputNumber = ({ init, step, min, max, onChange }) => {
    step = step || 1;

    const inputRef = useRef();

    min = min || -10;
    max = max || 10;

    const valid = (value) => {
        // eslint-disable-next-line prettier/prettier
        const reg = /^-?\d*$/;

        let v = value;

        if (reg.test(value)) {
            v = value;
        } else {
            v = parseInt(value, 10) || 0;
        }

        if (parseInt(v) < min) v = min;
        if (parseInt(v) > max) v = max;

        return v;
    };

    const change = (target) => {
        if (typeof onChange == 'function') onChange(target);
    };

    const decrease = () => {
        const v = parseInt(inputRef.current.value) - step;
        inputRef.current.value = valid(v);
        change(inputRef.current);
    };

    const increase = () => {
        const v = parseInt(inputRef.current.value) + step;
        inputRef.current.value = valid(v);
        change(inputRef.current);
    };

    const handleChange = (e) => {
        const v = valid(e.target.value);
        e.target.value = v;
        change(inputRef.current);
    };

    const handleBlur = (e) => {
        e.target.value = parseInt(e.target.value) || 0;
        change(inputRef.current);
    };

    return (
        <Container>
            <ArrowBackIosNewIcon onClick={decrease} />
            <StyledInput
                ref={inputRef}
                defaultValue={init || 0}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <ArrowForwardIosIcon onClick={increase} />
        </Container>
    );
};

export default InputNumber;
