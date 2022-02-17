import axios from "axios";
import { addUserAction } from "../store/chats/actions";
const URLUsers = 'https://chat-9873752748903-default-rtdb.europe-west1.firebasedatabase.app/users.json'

export const fetchingUsers = () => {
    return async function (dispatch){
        const result = await axios.get(URLUsers)
        return await dispatch(addUserAction(result.data))
    }
}

export const addUser = (newUser) => {
    return async function(dispatch){
        const response = await axios.get(URLUsers)
        const result = await {...response.data, ...newUser}
            await axios.put(URLUsers, result)
            return await dispatch(addUserAction(result))
    }
}

export const updateUsers = (newUserList) => {
    return async function(dispatch){
        await axios.put(URLUsers, newUserList)
        return await dispatch(addUserAction(newUserList))
    }
}