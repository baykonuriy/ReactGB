export const ADD_USER = 'ADD_USER'
export const ADD_CURRENT_USER = 'ADD_CURRENT_USER'
export const SET_AUTH = 'SET_AUTH'
export const ADD_CURRENT_CHAT = 'ADD_CURRENT_CHAT'
export const SET_MESSAGES = 'SET_MESSANGES'

export const addUserAction = (payload) => ({type: ADD_USER, payload})
export const addCurrentUserAction = (payload) => ({type: ADD_CURRENT_USER, payload})
export const setAuthAction = (payload) => ({type: SET_AUTH, payload})
export const addCurrentChatAction = (payload) => ({type: ADD_CURRENT_CHAT, payload})
export const setMessagesAction = (payload) => ({type: SET_MESSAGES, payload})