import { ADD_CURRENT_USER, GET_USERS, ADD_USER } from "./actions"

const defaultState = {
    users: {},
    user:{}
}

export const chatsReduser1 = (state = defaultState, action) => {
    switch(action.type){
        case GET_USERS:
            return {...state, users: action.payload}
        case ADD_CURRENT_USER:
            return {...state, user: action.payload}
        case ADD_USER:
            return {...state, users: action.payload}
        default:
            return state
    }
}