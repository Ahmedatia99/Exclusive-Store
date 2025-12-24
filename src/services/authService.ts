import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginService = (data: { email: string; password: string }) => {
  return axios.post(`${BASE_URL}/users/login`, data, { withCredentials: true });
};

export const signupService = (data: { fullName: string; email: string; password: string }) => {
  return axios.post(`${BASE_URL}/users/register`, data, { withCredentials: true });
};
