import React, {useState} from "react"
import Konstantin from '../static/images/1.jpeg'
import Ekaterina from '../static/images/3.jpeg'
import Oleg from '../static/images/4.jpeg'

export const useChatList = () =>{
    const [chats, setChats] = useState(
        [
            {
                chatName: 'Konstantin',
                status: 'Online',
                userpic: `${Konstantin}`,
                id: 'chat1'
            },
            {
                chatName: 'Ekaterina',
                status: 'Online',
                userpic: `${Ekaterina}`,
                id: 'chat2'
            },
            {
                chatName: 'Oleg',
                status: 'Offline',
                userpic: `${Oleg}`,
                id: 'chat3'
            }
        ]
    )

    return [chats]
}