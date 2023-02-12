import { PostAPI } from "../api";
import { actionEnum } from "../enums";

export const getTimeLinePosts = (id) => async (dispatch) => {
    dispatch({ type: actionEnum.RETREIVING_START });
    try {
        const { data } = await PostAPI.getTimeLinePosts(id);
        dispatch({ type: actionEnum.RETREIVING_SUCCESS, data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: actionEnum.RETREIVING_FAIL });
    }
};