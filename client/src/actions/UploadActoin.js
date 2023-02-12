import { PostAPI } from "../api";
import { actionEnum } from "../enums";

// export const uploadImage = (data) => async (dispatch) => {
//     try {
//         await UploadAPI.uploadImage(data);
//     } catch (error) {
//         console.log(error);
//     }
// };
export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: actionEnum.POST_UPLOAD_START });
    try {
        const newPost = await PostAPI.postPost(data);
        dispatch({ type: actionEnum.POST_UPLOAD_SUCCESS, data: newPost.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: actionEnum.POST_UPLOAD_FAIL });
    }
};