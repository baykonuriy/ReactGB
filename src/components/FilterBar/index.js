import React, {useState} from "react";
import styled from './FilterBar.module.scss'
import { DropDown, FunctionButton } from "..";


export const FilterBar = (props) =>{

    const
        {
            currFilters,
            filterValue,
            addValueFilter,
            clear,
            addFilter,
            disabledFilter,
            removeChips
        } = props

    function removeThisChips(e){
        //console.log('removeThisChips', e)
        removeChips(e)
    }
    return(
        <div className={styled.FilterBar}>
            <div 
                className={styled.FilterBar__Add}
                style=
                    {
                        currFilters.length === 0?
                            {display: "block"} :
                            {display: "none"}
                    }>
                <DropDown
                    disabled={disabledFilter}
                    action={addFilter}
                    value={filterValue}
                    type='icon'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M4.5 5.5V6.29744L9.60046 10.5478C10.1704 11.0228 10.5 11.7264 10.5 12.4684V18.0389L12.7938 16.6082C13.2331 16.3342 13.5 15.8531 13.5 15.3355V12.4684C13.5 11.7264 13.8296 11.0228 14.3995 10.5478L19.5 6.29744V5.5H4.5ZM21 7L15.3598 11.7002C15.1318 11.8901 15 12.1716 15 12.4684V15.3355C15 16.3708 14.4661 17.333 13.5877 17.8809L10.1469 20.027C9.64736 20.3386 9 19.9794 9 19.3906V12.4684C9 12.1716 8.86818 11.8901 8.64018 11.7002L3 7V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V7Z" 
                            fill="#101828"/>
                    </svg>
                </DropDown>
            </div>
            <div
                className={styled.FilterBar__Cleaning}
                style=
                    {
                        currFilters.length > 0?
                            {display: "block"} :
                            {display: "none"}
                    }>
                <FunctionButton
                    action={clear}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 4H20C20.5523 4 21 4.44772 21 5V6.97364L15.3632 11.6297C15.1332 11.8197 15 12.1024 15 12.4007V15.2135C15 16.253 14.4618 17.2185 13.5776 17.7652L10.1444 19.8877C9.64474 20.1966 9 19.8372 9 19.2498V12.4007C9 12.1024 8.86683 11.8197 8.63685 11.6297L3 6.97364V5C3 4.44772 3.44772 4 4 4ZM17.0606 20.0027L19.0014 18.062L20.9422 20.0027L22.0029 18.942L20.0621 17.0013L22.0029 15.0607L20.9422 14L19.0014 15.9407L17.0606 14L16 15.0607L17.9408 17.0013L16 18.942L17.0606 20.0027Z"
                            fill="#40A2FF"/>
                    </svg>
                </FunctionButton>
            </div>
            {
                currFilters.map(filter=>{
                    return (
                        <DropDown
                            removeChips={removeThisChips}
                            action={addValueFilter}
                            value={filter}
                            key={filter.id}
                            type='chips'/>
                    )
                })
            }
            <div 
                className={styled.FilterBar__Add__Plus}
                style=
                    {
                        currFilters.length > 0?
                            {display: "block"} :
                            {display: "none"}
                    }>
                <DropDown
                    disabled={filterValue.length === 0? true : false}
                    action={addFilter}
                    value={filterValue}
                    type='icon'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z"
                            fill="#101828"/>
                    </svg>
                </DropDown>
            </div>
          
        </div>
    )
}