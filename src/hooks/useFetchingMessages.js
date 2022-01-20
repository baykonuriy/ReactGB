import { useState } from "react"

export const useFetchingMessages = 
    (
        getMessages,
        addNewMessage
    ) =>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetching = async () =>{
        try{
            setLoading(true)
            await getMessages()
        } catch(e){
            setError(true)
        } finally{
            setLoading(false)
        }
    }

    const createMessage = newMessage =>{
        newMessage.role = 'sender'
        newMessage.userpic = 'https://ichef.bbci.co.uk/images/ic/256xn/p077b1km.jpg'
        addNewMessage(newMessage)
    }

    const removeMessage = message => {

    }

   return[fetching, createMessage, loading, error]
}