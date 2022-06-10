const isNumber = (n) => {
    return typeof n === 'number';
};

const isEmptyString = (n) => {
    return n.trim().length > 0;
};

const longerThan = (n, l) => {
    return n.trim().length > l;
};

export { isNumber, isEmptyString, longerThan };
