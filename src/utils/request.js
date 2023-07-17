import axios from 'axios';

const header = {
    Authorization: `bearer ${localStorage.getItem('token')}`,
};

const post = (url, body, head) => {
    const API = process.env.REACT_APP_API_URL + url;
    return axios.post(API, body, { headers: header, ...head });
};

const get = (url, params) => {
    const API = process.env.REACT_APP_API_URL + url;
    return axios.get(API, { headers: header, params: params });
};

const put = (url, body, head) => {
    const API = process.env.REACT_APP_API_URL + url;
    return axios.put(API, body, { headers: header, ...head });
};

export { post, get, put };
