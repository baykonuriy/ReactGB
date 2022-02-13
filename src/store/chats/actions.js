export const ADD_USER = 'ADD_USER'
export const GET_USERS = 'GET_USERS'
export const ADD_CURRENT_USER = 'ADD_LOGIN'

export const addUserAction = (payload) => ({type: ADD_USER, payload})
export const getUsersAction = (payload) => ({type: GET_USERS, payload})
export const addCurrentUserAction = (payload) => ({type: ADD_CURRENT_USER, payload})
