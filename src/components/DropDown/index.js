import React, {useState, useEffect} from "react";
import styled from "./DropDown.module.scss"
import
{ 
    InputText,
    MultiSelect,
    ValueList,
    Chips,
    FunctionButton,
    PopOver
} from "..";

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
        setTimeout(()=>{
            setViewListInChips(true)
            document.addEventListener('click', closeListChips)
        }, 30)
    }
    function closeListChips(){
        setTimeout(()=>{
            setViewListInChips(false)
            document.removeEventListener('click', closeListChips)
        }, 20)
    }
    useEffect(() => {
        setViewListInChips(true)
        document.addEventListener('click', closeListChips)
    }, [])

    useEffect(()=>{
        return ()=>{
            document.removeEventListener('click', closeListChips)
        }
    }, [])

    if(type === 'field'){
        function getValueInField(val){
            action(val)
        }
        return(
            <div className={styled.DropDown}>
                <InputText
                    placeholder='Chat name'
                    iconTitle='Add chat'
                    type="select"
                    opened_list={(e) => setViewList(e)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.25 8.75V14H8.75V8.75H14V7.25H8.75V2H7.25V7.25H2V8.75H7.25Z" fill="#101828" fillOpacity="0.5"/>
                    </svg>
                </InputText>
                <div
                    className=
                        {
                            styled.DropDown__list + ' ' + 
                            styled.inField
                        }
                    style=
                        {
                            viewList
                            ? {display: "block"}
                            : {display: "none"}
                        }>
                    <ValueList
                        value={value}
                        action={val => getValueInField(val)}
                        />
                </div>
            </div>
        )
    }

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

                tabIndex="1"
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