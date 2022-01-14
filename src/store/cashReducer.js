
const defaultState = {
    cash: 10
}

const ADD_CASH = 'ADD_CASH'
const GET_CASH = 'GET_CASH'
  
export const cashReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_CASH':
            return {...state, cash: state.cash + action.payload}
        
        case 'GET_CASH':
            return {...state, cash: state.cash - action.payload}
        default:
            return state
    }
}

export const addCashAction = (payload) => ({type: ADD_CASH, payload})
export const getCashAction = (payload) => ({type: GET_CASH, payload})

// export const INCREMENT = 'INCREMENT'
// export const ASYNC_INCREMENT = 'ASYNC_INCREMENT'
// export const DECREMENT = 'DECREMENT'
  
// export const cashReducer = (state = defaultState, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             return {...state, cash: state.cash + 1}
        
//         case 'DECREMENT':
//             return {...state, cash: state.cash - 1}
//         default:
//             return state
//     }
// }

// export const createIncrement = () => ({type: INCREMENT}) 
// export const asyncIncrement = () => ({type: ASYNC_INCREMENT})
// export const createDecrement = () => ({type: DECREMENT})