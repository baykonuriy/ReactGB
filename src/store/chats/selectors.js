export const getUser = (state) => state.chats.user
export const getUsers = (state) => state.chats.users
export const getAuth = (state) => state.chats.auth
export const hasUser = (userID) => (state) => getUsers(state).hasOwnProperty(userID) 
export const getMessages = (state) => state.chats.messages
export const getCurrentChat = (state) => state.chats.currentChat
