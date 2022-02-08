import React, {useContext, useState} from "react";
import { useEffect } from "react";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { FirebaseContext } from "../../context";

export const Temporary = () =>{
    const [message, setMessage] = useState('')
    const { _, firestore } = useContext(FirebaseContext)
    const [fireMessages, loading] = useCollectionData(
        firestore.collection('mess')
    )
    async function sendMessage(){
        const id = Date.now()
        await firestore.collection('mess').doc(String(id)).set(
            {
                id: id,
                text: message
            }
        )
    }

    async function repl(id){
        await firestore.collection('mess').doc(String(id)).delete(String(id))
    }

    useEffect(() => {
        console.log(fireMessages)
    }, [fireMessages])

    return(
        <div
            className="page"
            style={{height: "100vh"}}>

            {   
                fireMessages ?
                fireMessages.map(elem => {
                    return(
                        <p
                            onClick={() => repl(elem.id)}
                            key={elem.id}>{elem.text}</p>
                    )
                }) :
                <p>none</p>
            }
            <input
                onChange={(e) => setMessage(e.target.value)}
                type="text" name="" id="" />
            <button
                onClick={sendMessage}
                className="Button primary">
                send
            </button>
        </div>
      
    )
}

