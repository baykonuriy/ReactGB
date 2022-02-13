// const defaultState = {
//     chats: [],
//     messages: [],
//     current: {},
//     chat:{},
// //-------------
//     users: {},
//     user:{}
// }

// const UPDATE_CURRENT_CHAT = 'UPDATE_CURRENT_CHAT'
// const UPDATE_CHATS = 'UPDATE_CHATS'
// const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
// const ADD_USER = 'ADD_USER'
// const GET_USERS = 'GET_USERS'
// const ADD_CURRENT_USER = 'ADD_LOGIN'

// export const chatsReduser = (state = defaultState, action) => {
//     switch(action.type){
//         case UPDATE_CURRENT_CHAT:
//             return {...state, current: action.payload}
//         case UPDATE_MESSAGES:
//             return {...state, messages: [...action.payload]}
//         case UPDATE_CHATS:
//             return {...state, chats: action.payload}
//         case ADD_USER:
//             return {...state, users: action.payload}
//         //----------
//         case GET_USERS:
//             return {...state, users: action.payload}
//         case ADD_CURRENT_USER:
//             return {...state, user: action.payload}
//         default:
//             return state
//     }
// }

// export const updateCurrentAction = (payload) => ({type: UPDATE_CURRENT_CHAT, payload})
// export const updateChatsAction = (payload) => ({type: UPDATE_CHATS, payload})
// export const updateMessagesAction = (payload) => ({type: UPDATE_MESSAGES, payload})
// export const addUserAction = (payload) => ({type: ADD_USER, payload})
// //---------
// export const getUsersAction = (payload) => ({type: GET_USERS, payload})
// export const addCurrentUserAction = (payload) => ({type: ADD_CURRENT_USER, payload})

