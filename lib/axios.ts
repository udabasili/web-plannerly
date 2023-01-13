import axios, { AxiosRequestConfig } from 'axios';

export const apiCall = axios.create({
	baseURL: '/api/',
});
