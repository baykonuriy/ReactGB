import React from "react";
import { FunctionButton } from "..";
import styled from './Chips.module.scss'

export const Chips = (
    {
        value,
        remove
    }) =>{

    function removeChips(){
        remove()
    }

    return(
        <div
            className={styled.Chips}>
            <p className={styled.Chips__key}>
                {value.name + ':'}
            </p>
            <p className={styled.Chips__value}>
                {
                    value.value === ''?
                        '...' :
                        value.value
                }
            </p>
            <div
                className={styled.Chips__close}>
                <FunctionButton
                    action={removeChips}
                    title="Удалить фильтр"
                    size="12px">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.93964 7.99982L2.84814 12.0913L3.9088 13.152L8.0003 9.06048L12.0918 13.152L13.1525 12.0913L9.06095 7.99982L13.1524 3.90832L12.0918 2.84766L8.0003 6.93916L3.90881 2.84766L2.84816 3.90832L6.93964 7.99982Z"
                        fill="#101828"/>
                    </svg>
                </FunctionButton>
            </div>
        </div>
    )
}