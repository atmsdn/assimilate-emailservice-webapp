import axios from 'axios';
import { isValidToken } from '../contexts/JWTAuthContext';
const axiosInstance = axios.create();

export const setSession = (token) => {
    if (token) {
        localStorage.setItem('token', token)
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
        localStorage.removeItem('token')
        delete axiosInstance.defaults.headers.common.Authorization
    }
}
axiosInstance.interceptors.request.use(
    async (conf) => {
        const token = window.localStorage.getItem('token')
        if (token && isValidToken(token)) {
            localStorage.setItem('token', token)
            conf.headers["Authorization"] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token')
            delete axiosInstance.defaults.headers.common.Authorization
        }
        return conf;
    },
);

export default axiosInstance;
