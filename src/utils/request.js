import axios from 'axios';

const header = {
    Authorization: `${localStorage.getItem('token')}`,
};

const post = (url, body) => {
    const API = process.env.REACT_APP_API_URL + url;
    return axios.post(API, body, { headers: header });
};

const get = (url, params) => {
    const API = process.env.REACT_APP_API_URL + url;
    return axios.get(API, { headers: header, params: params });
};

export { post, get };
