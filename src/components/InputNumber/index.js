import { useState } from 'react';

const InputNumber = ({ init, max, onChange, className }) => {
    const [value, setValue] = useState(init || 0);

    const min = 0;
    max = max || 10;

    const change = (e) => {
        // const reg = /(^[0-9]{0,2}$)|(^[0-9]{0,2}\.[0-9]{0,5}$)/;
        const reg = /^(10(\.00?)?|[0-9](\.\d{1,2})?)$/;
        setValue(e.target.value.replace(",", "."));
        // const n = parseFloat(e.target.value.replace(",", "."));
        if (e.target.value.trim().length == 0) {
            setValue(e.target.value || min);
        }

        if (!reg.test(e.target.value)) {
            setValue(e.target.value || min);
        }

        if (e.target.value > max) setValue(max || 0);
        if (e.target.value < min) setValue(min || 0);
        // if (typeof onChange == 'function') {
        //     onChange(e, value);
        // }
    };

    return (
        <input
            className={className}
            value={value}
            onChange={change}
            onBlur={change}
            onKeyUp={onChange}
        />
    );
};

export default InputNumber;
