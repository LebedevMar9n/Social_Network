import { actionEnum } from "../enums";

const authReducer = (
    state = { authData: null, loading: false, error: false },
    action) => {
        console.log(action.type);
    switch (action.type) {
        case actionEnum.AUTH_START:
            return { ...state, loading: true, error: false };
        case actionEnum.AUTH_SUCCESS:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, error: false };
        case actionEnum.AUTH_FAIL:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export default authReducer;