import { AuthAPI } from "../api";
import { actionEnum } from "../enums";

export const logIn = (formData) => async (dispatch) => {
    dispatch({ type: actionEnum.AUTH_START });
    try {
        const { data } = await AuthAPI.logIn(formData);
        dispatch({ type: actionEnum.AUTH_SUCCESS, data: data });

    } catch (error) {
        console.log(error);
        dispatch({ type: actionEnum.AUTH_FAIL });
    }
};

export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: actionEnum.AUTH_START });
    try {
        const { data } = await AuthAPI.signUp(formData);
        dispatch({ type: actionEnum.AUTH_SUCCESS, data: data });

    } catch (error) {
        console.log(error);
        dispatch({ type: actionEnum.AUTH_FAIL });
    }
};

export const logOut=()=>async(dispatch)=>{
    dispatch({type:actionEnum.LOG_OUT})
}