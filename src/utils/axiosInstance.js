import axios from 'axios'
import { BASE_URl } from './constants'

const axiosInstance=axios.create({
    baseURL:BASE_URl,
    timeout:10000,
    headers:{
        "content-type": "application/json",
    }

})

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


export default axiosInstance;