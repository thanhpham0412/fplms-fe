import { useState } from 'react';

import axios from 'axios';

import { StyledButton } from './style.js';

const Button = ({ value }) => {
    const [username, setUsername] = useState(value);

    const API_PATH = process.env.REACT_APP_API_URL;

    axios.get(API_PATH + '/username').then((response) => {
        setUsername(response.username);
    });

    return (
        <div>
            <StyledButton>{username}</StyledButton>
        </div>
    );
};

export default Button;
