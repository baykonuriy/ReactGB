import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFirebaseChats } from "../../hooks/useFirebaseChats";
import { FunctionButton } from "..";
import styled from "./ChatCreator.module.scss"
import
{ 
    ValueList
} from "..";

export const ChatCreator = (
    {
        value,
        action,
        iconTitle,
        children
    }) =>{

    const
    [
        chat,
        createDefaultChat,
        getCurrentChat,
        createChat,
        addMessage,
        loading
    ] = useFirebaseChats()

    const [val, setVal] = useState('')
    const inp = useRef()
    const [viewList, setViewList] = useState(false)

    const filtredValues = useMemo(() => {
        return value.filter(elem => elem.name.includes(val))
    }, [value, val])

    useEffect(() => {
        if(filtredValues.length === 0 && val !== ''){
            setViewList(false)
        } else{
            setViewList(true)
        }
    }, [filtredValues])

    useEffect(() => {
        setViewList(false)
    }, [])
    
    const closeListHandler = {
        wait: ()=> setTimeout(() => setViewList(false) , 100)
    }

    useEffect(() => {
        return () =>{
            clearTimeout(closeListHandler.wait)
        }
    }, [viewList])
    
     
    function getValueInField(val){
        action(val)
    }


  

    return(
        <div className={styled.ChatCreator}>
            <div className={styled.ChatCreator__Wrapper}>
                <input
                    placeholder="Search chat"
                    type="text"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onFocus={() => {setViewList(true)}}
                    onBlur={() => {closeListHandler.wait()}}
                    />
                <FunctionButton
                        action={()=>{
                            action(val)
                            setVal('')
                            inp.current.focus()
                        }}
                        size={24}
                        title={iconTitle}
                        disabled={value === ''? true : false}>
                        {children}
                </FunctionButton>
            </div>
            <div
                className={styled.ChatCreator__List}
                style=
                {
                    viewList === true
                    ? {display: 'block'}
                    : {display: 'none'}
                }>
                <ValueList
                    value={filtredValues}
                    action=
                    {
                        val =>
                        {
                            getValueInField(val)
                        }
                    }
                    />
            </div>
        </div>
    )
   
}