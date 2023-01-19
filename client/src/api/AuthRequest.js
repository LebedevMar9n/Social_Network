import { urls } from "../constants";
import { API } from "./BaseRequest";

export const AuthAPI = {
    logIn: (formData) => API.post(`${urls.auth}/login`, formData),
    signUp: (formData) => API.post(`${urls.auth}/register`, formData)
};