import { HIDE_ALERT, SHOW_ALERT } from "../types";


const handlers = {
    [SHOW_ALERT]: (state, action) =>{
        return action.payload
    },
    [HIDE_ALERT]: () => {
        return null
    },
    DEFAULT: (state) => {
        return state
    }
}

export const AlertReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}

// export const AlertReducer = (state, action) => {
//     switch(action.type){
//         case SHOW_ALERT:
//             return action.payload
//         case HIDE_ALERT:
//             return null
//         default: return state
//     }
// }