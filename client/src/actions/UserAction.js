import { UserAPI } from "../api";
import { actionEnum } from "../enums";

export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: actionEnum.UPDATE_USER_START });
    try {
        const { data } = await UserAPI.updateUser(id,formData)
        dispatch({ type: actionEnum.UPDATE_USER_SUCCESS, data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: actionEnum.UPDATE_USER_FAIL });
    }
};