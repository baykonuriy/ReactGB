import moment from "moment"
import { setMessagesAction } from "../store/chats"

export const sendMessageMiddleWare = (text, currentChat, sender) => {
    const message = {
        chat_id: currentChat,
        id: Date.now(),
        date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
        text: text,
        user: sender
    }
    return (dispatch) => {
        dispatch(setMessagesAction(message))
        if(sender !== 'Bot'){
            const botMessage = {...message, text: `Bot reply to your message: "${text}"`, id: message.id + 1,user: 'Bot'}
            const jj = () => {
                setTimeout(() => {
                    dispatch(setMessagesAction(botMessage))
                }, 500)
            }
            jj()
            clearTimeout(jj)
        }
    }
   
}

