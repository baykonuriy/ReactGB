import { SET_LOADING, SEARCH_USERS, GET_REPOS, GET_USER, CLEAR_USERS } from "../types" 

const handlers = {
    [SET_LOADING]:state => ({...state, loading: true}),
    [SEARCH_USERS]: (state, action) => ({...state, users: action.payload, loading: false}),
    [GET_REPOS]: (state, action) => ({...state, repos: action.payload, loading: false}),
    [GET_USER]:(state, action) => ({...state, user: action.payload, loading: false}),
    [CLEAR_USERS]:state => ({...state, users: []}),
    DEFAULT: state => state
}

export const GitHubReducer = (state, action) =>{
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}