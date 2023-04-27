import axios from 'axios';

const apiWithToken = axios.create({
  baseURL: 'http://localhost:8081',
});

const api = axios.create({
  baseURL: 'http://localhost:8081',
});

const apiAC = axios.create({
  baseURL: 'http://localhost:8091',
});

const apiCA = axios.create({
  baseURL: 'http://localhost:8092',
});

const apiEK = axios.create({
  baseURL: 'http://localhost:8093',
});
const apiLH = axios.create({
  baseURL: 'http://localhost:8094',
});
const apiDL = axios.create({
  baseURL: 'http://localhost:8095',
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


export {api, apiWithToken, apiAC, apiCA,apiEK,apiLH,apiDL};
