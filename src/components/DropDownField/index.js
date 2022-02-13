import React, {useState} from "react";
import styled from "./DropDown.module.scss"
import
{ 
    InputText,
    ValueList,
} from "..";

export const DropDownField = (
    {
        value,
        action
    }) =>{
    const [viewList, setViewList] = useState(false)
   
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