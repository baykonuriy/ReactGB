import
{
    GET_GIST_REQUEST,
    GET_GISTS_FAILURE,
    GET_GISTS_SUCCESS,
    RESET_GISTS_STATUS
} from "./actions";

export const STATUSES = {
    IDLE: 0,
    REQUEST: 1,
    SUCCESS: 2,
    FAILURE: 3
}

const defaultState = {
    gists: [],
    request: STATUSES.IDLE,
    error: null,
    loading: false
}

export const gistsReducer = (state = defaultState, action) => {
    switch(action.type){
        case GET_GIST_REQUEST:
            return {...state, request: STATUSES.REQUEST}
        case GET_GISTS_SUCCESS:
            return {...state, gists: action.payload, request: STATUSES.SUCCESS}
        case GET_GISTS_FAILURE:
            return {...state, error: action.payload, request: STATUSES.FAILURE}
        case RESET_GISTS_STATUS:
            return {...state, error: null, request: STATUSES.IDLE}
        default:
            return state
    }
}