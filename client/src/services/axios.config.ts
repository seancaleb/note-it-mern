import axios from 'axios';

let url;

if (import.meta.env.PROD) url = import.meta.env.VITE_PROD_URL;
else url = import.meta.env.VITE_DEV_URL;

export default axios.create({
    baseURL: `${url}/api`,
    headers: {
        'Content-type': 'application/json',
    },
});
