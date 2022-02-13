import React from "react";
import styled from './ValueList.module.scss'

export const ValueList = (props) => {
    const {value} = props
    const {action} = props

    function sendItemValue(itemValue, e){
        action(itemValue)
    }

    return(
        <ul className={styled.ValueList}>
            {
                value.map(item=>{
                    return(
                        <li
                            onClick={(e)=>sendItemValue(item, e)}
                            key={item.id}
                            className={styled.ValueList__item}>
                            <p>{item.name}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}