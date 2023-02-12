import { actionEnum } from "../enums";

const postReducer = (
    state = { posts: [], uploading: false, error: false },
    action) => {
    console.log(action.type);
    switch (action.type) {
        case actionEnum.POST_UPLOAD_START:
            return { ...state, uploading: true, error: false };
        case actionEnum.POST_UPLOAD_SUCCESS:
            return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
        case actionEnum.POST_UPLOAD_FAIL:
            return { ...state, uploading: false, error: true };
        case actionEnum.RETREIVING_START:
            return { ...state, uploading: true, error: false };
        case actionEnum.RETREIVING_SUCCESS:
            return { ...state, posts: [...action.data], uploading: false, error: false };
        case actionEnum.RETREIVING_FAIL:
            return { ...state, uploading: false, error: true };
        default:
            return state;
    }
};

export default postReducer;