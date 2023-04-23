import axios from 'axios';

const apiWithToken = axios.create({
  baseURL: 'http://localhost:8081',
});

const api = axios.create({
  baseURL: 'http://localhost:8081',
});


apiWithToken.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Token Added"+ config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export {api, apiWithToken};
