const defaultState = {
    first_name: 'Konstantin',
    last_name: 'Konstantinopolsky',
    patronim: 'Константинович',
    nickname: 'Konstantin K.',
    online: false
}

//actions

const CHANGE_STATUS = 'CHANGE_STATUS'


export const profileReducer = (state = defaultState, action) =>{
    switch(action.type){
        case CHANGE_STATUS: 
            return {...state, online: action.payload}
        default:
            return state
    }
   
}
