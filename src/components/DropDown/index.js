import React, {useState, useEffect} from "react";
import { FunctionButton } from "..";
import { Chips } from "..";
import { ValueList } from "..";
import { MultiSelect } from "..";
import { PopOver } from "..";
import styled from "./DropDown.module.scss"

export const DropDown = (
    {
        type,
        value,
        action,
        children,
        disabled,
        removeChips

    }) =>{

    const [viewList, setViewList] = useState(false)
    const [viewListInChips, setViewListInChips] = useState(false)

    function openListInChips(){
        setViewListInChips(true)
        setTimeout(()=>{
            document.addEventListener('click', closeListChips)
        }, 200)
    }

    function closeListChips(){
        setViewListInChips(false)
        document.removeEventListener('click', closeListChips)
    }

    useEffect(()=>{
        openListInChips()
        return ()=>{
            setTimeout(()=>{
                document.removeEventListener('click', closeListChips)
            })
        }
    }, [])

    if(type === 'icon'){

        function sendValueInIcon(val){
            action(val)
        }


        return(
            <div
                tabIndex="1"
                onFocus={()=>{setViewList(true)}}
                onBlur={()=>{setViewList(false)}}
                className=
                {
                    styled.DropDown
                }>
                <FunctionButton
                    disabled={disabled}
                    title={'Filter'}>
                    {
                        children
                    }
                </FunctionButton>
                <div
                    className={styled.DropDown__list}
                    style=
                    {
                        viewList === true && value.length > 0 && disabled === false?
                            {display: 'block'} :
                            {display: 'none'}
                    }>
                    <ValueList
                        action={sendValueInIcon}
                        value={value}/>
                </div>
            </div>
        )
    }

    if(type === 'chips'){
            
        function sendValueInChips(e){
            setViewListInChips(false)
            action(
                {
                    id: value.id,
                    value: e
                })
        }

        function removeThisChips(){
            removeChips(value)
        }

        return(
            <div
                onClick={openListInChips}
                className=
                    {
                        styled.DropDown
                    }>
                <Chips
                    remove={removeThisChips}
                    value={value}>
                </Chips>
                <div
                    className={styled.DropDown__list}
                    style=
                    {
                        viewListInChips === true?
                            {display: 'block'} :
                            {display: 'none'}
                    }>
                    <PopOver>
                        <MultiSelect
                            action={sendValueInChips}/>
                    </PopOver>
                </div>
            </div>
            
        )
    }
}