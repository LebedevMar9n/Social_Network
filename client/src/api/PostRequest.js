import { urls } from "../constants";
import { API } from "./BaseRequest";

export const PostAPI = {
    postPost: (data) => API.post(urls.post, data),
};