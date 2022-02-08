import { useContext, useEffect, useState } from "react"
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore";  
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentAction, addCurrentUserAction } from "../store/chatsReducer";
import { updateUsers } from "../asyncActions/users";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { FirebaseContext } from "../context";
import { useFarebaseUsers } from "./useFirebaseUsers";
import moment from "moment";

export const useFirebaseChats = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.chats.users)
    const user = useSelector(state => state.chats.user)
    const [currentChat, setCurrentChat] = useState('chats')
    const { _, firestore } = useContext(FirebaseContext)
    const [chat, loading] = useCollectionData(
        firestore.collection(currentChat)
    )

    function createDefaultChat(sender, message){
        const id = Date.now()
        firestore
        .collection(`default_${sender}`)
        .doc(String(id))
        .set(
            {
                chat_id: `default_chat_${sender}`,
                id: String(id),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: message,
                user: sender
            }
        )
    }

    function getCurrentChat(chatName){
        setCurrentChat(chatName)
    }

    function updateUserChatList(updatedUsers, updatedUser){
        firestore
        .collection('state')
        .doc('users')
        .set({...updatedUsers})
        dispatch(addCurrentUserAction(updatedUser))
        dispatch(updateUsers(updatedUsers))
        localStorage.setItem('user', JSON.stringify(updatedUser))
        localStorage.setItem('users', JSON.stringify(updatedUsers))
    }

    function createChat(recipient, sender, message, signature){
        const docId = Date.now()
        const updatedUser = {...sender}
        updatedUser.chats = {...updatedUser.chats, [recipient.name]: users[recipient.name]}
        const updatedAllUsers = {...users}
        updatedAllUsers[sender.id] = {...updatedUser}
        updateUserChatList(updatedAllUsers, updatedUser)
        firestore
        .collection(recipient.id + '_' + sender.id)
        .doc(String(docId))
        .set(
            {
                chat_id: recipient.id + '_' + sender.id,
                id: String(docId),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: message,
                user: signature
            }
        )
    }

    // const [tempoChatName, setTempoChatName] = useState('')

    // const [tempoChat, tempoLoading] = useCollectionData(
    //     firestore.collection(tempoChatName)
    // )

    function addMessage(recipient, sender, message){
        // setTempoChatName(recipient + '_' + sender)
        if(users[sender].chats[recipient + '_' + sender]){
            messanger(recipient, sender, message)
        } else{

        }
        
        
    }

    function messanger(recipient, sender, message){

        const id = Date.now()
        firestore
        .collection(recipient + '_' + sender)
        .doc(String(id))
        .set(
            {
                chat_id: recipient + '_' + sender,
                id: String(id),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: message,
                user: sender
            }
        )
        firestore
        .collection(recipient + '_' + sender)
        .doc(String(id))
        .set(
            {
                chat_id: id,
                id: String(id),
                date: moment().format('MMMM Do YYYY, hh:mm:ss a'),
                text: message,
                user: sender
            }
        )
    }

    return[
        chat,
        createDefaultChat,
        getCurrentChat,
        createChat,
        addMessage,
        loading
    ]
}
