import Axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const axiosClient = Axios.create({});

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = 'application/json';
  return config;
}
axiosClient.interceptors.request.use(authRequestInterceptor);
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    throw error;
  },
);

export default axiosClient;
