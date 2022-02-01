const defaultState = {
    chats: []
}

const ADD_CHAT = 'ADD_CHAT'
const REMOVE_CHAT = 'REMOVE_CHAT'
const GET_CHATS = 'GET_CHATS'


export const chatsReduser = (state = defaultState, action) => {
    switch(action.type){
        case GET_CHATS: 
            return {...state, chats: [...state.chats, action.payload]}
        default:
            return state
    }
}