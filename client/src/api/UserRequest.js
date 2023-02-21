import { urls } from "../constants";
import { API } from "./BaseRequest";

export const UserAPI = {
    getOneById: (userId) => API.get(`${urls.user}/${userId}`),
    updateUser: (userId, formData) => API.put(`${urls.user}/${userId}`, formData),
};