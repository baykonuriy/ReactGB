const defaultState = {
    chats: [],
    messages: [],
    current: {},
    users: {}
}

const UPDATE_CURRENT_CHAT = 'UPDATE_CURRENT_CHAT'
const UPDATE_CHATS = 'UPDATE_CHATS'
const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
const ADD_USER = 'ADD_USER'

export const chatsReduser = (state = defaultState, action) => {
    switch(action.type){
        case UPDATE_CURRENT_CHAT:
            return {...state, current: action.payload}
        case UPDATE_MESSAGES:
            return {...state, messages: [...action.payload]}
        case UPDATE_CHATS:
            return {...state, chats: action.payload}
        case ADD_USER:
            return {...state, users: action.payload}
        default:
            return state
    }
}

export const updateCurrentAction = (payload) => ({type: UPDATE_CURRENT_CHAT, payload})
export const updateChatsAction = (payload) => ({type: UPDATE_CHATS, payload})
export const updateMessagesAction = (payload) => ({type: UPDATE_MESSAGES, payload})
export const addUserAction = (payload) => ({type: ADD_USER, payload})

