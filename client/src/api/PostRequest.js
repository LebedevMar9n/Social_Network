import { urls } from "../constants";
import { API } from "./BaseRequest";

export const PostAPI = {
    postPost: (data) => API.post(urls.post, data),
    getTimeLinePosts: (id) => API.get(`${urls.post}/${id}/timeline`),
    likeAPost: (id, userId) => API.put(`${urls.post}/${id}/like`, { userId: userId })
};
