import axios from 'axios';
import { BASE_URL } from '../constants';

const appAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Adding a request interceptor for logging
appAxios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
});

// Adding a response interceptor for logging
appAxios.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
}, error => {
    console.log('appaxios.ts Response Error:', JSON.stringify(error, null, 2));
    return Promise.reject(error);
});

appAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');
  
    if (token) {
        config.headers['Authorization']=`Bearer ${ token }`;
        console.log(config.headers.Authorization);
        console.log(config);
    }
  
    return config;
  
  }, (error) => {
    return Promise.reject(error);
  });


export default appAxios;
