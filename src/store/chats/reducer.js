import
{
    ADD_CURRENT_USER,
    ADD_USER,
    SET_AUTH,
    ADD_CURRENT_CHAT,
    SET_MESSAGES
} from "./actions"

const defaultState = {
    users: {
        
            Ivanov_I:
            {
                first_name: 'Ivan',
                last_name: 'ivanov',
                patronim: 'Ivanovich',
                nickname: 'Ivanov_I',
                login: 'Ivanov_I',
                pass: '11',
                online: false,
                chats:{
                    default_Ivanov_I:
                    {
                        login: 'default_Ivanov_I',
                        online: false,
                        id: 'default_Ivanov_I',
                        removable: false
                    }
                },
                id: 'Ivanov_I',
                removable: true
            },
            Petrov_P:
            {
                first_name: 'Petr',
                last_name: 'Petrov',
                patronim: 'Petrovich',
                nickname: 'Petrov_P',
                login: 'Petrov_P',
                pass: '11',
                online: false,
                chats:{
                    default_Petrov_P:
                    {
                        login: 'default_Petrov_P',
                        online: false,
                        id: 'default_Petrov_P',
                        removable: false
                    }
                },
                id: 'Petrov_P',
                removable: true
            },
            Sidorov_S:
            {
                first_name: 'Sidor',
                last_name: 'Sidorov',
                patronim: 'Sidorovich',
                nickname: 'Sidorov_S',
                login: 'Sidorov_S',
                pass: '11',
                online: false,
                chats:{
                    default_Sidorov_S:
                    {
                        login: 'default_Sidorov_S',
                        online: false,
                        id: 'default_Sidorov_S',
                        removable: false
                    }
                },
                id: 'Sidorov_S',
                removable: true
            },
            pp:
            {
                first_name: 'pp',
                last_name: 'pp',
                patronim: 'pp',
                nickname: 'pp',
                login: 'pp',
                pass: '11',
                online: false,
                chats:{
                    default_pp:
                    {
                        login: 'default_pp',
                        online: false,
                        id: 'default_pp',
                        removable: false
                    }
                },
                id: 'pp',
                removable: true
            },
    },
    currentChat:'',
    user:{},
    messages:{},
    auth: false
}

export const chatsReduser1 = (state = defaultState, action) => {
    switch(action.type){
        case ADD_CURRENT_USER:
            return {...state, user: action.payload}
        case ADD_USER:
            return {...state, users: action.payload}
        case SET_AUTH: 
            return {...state, auth: action.payload}
        case ADD_CURRENT_CHAT:
            return {...state, currentChat: action.payload}
        case SET_MESSAGES:
            return {...state, messages: {...state.messages, [action.payload.id]: action.payload}}
        default:
            return state
    }
}