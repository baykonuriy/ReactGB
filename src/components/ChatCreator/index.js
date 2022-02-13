import React, { useEffect, useMemo, useRef, useState } from "react";
import { withChatCreator } from "../../HOCs/withChatCreator";
import styled from "./ChatCreator.module.scss"
import
{ 
    ValueList
} from "..";

export const ChatCreator = (
    {
        value,
        action,
        changeInputHandler,
        focusInputHandler,
        getValueInField,
        viewButton,
        viewList,
        val,
        closeListHandler,
        filtredValues
    }) =>{
    
    return(
        <div className={styled.ChatCreator}>
            <div className={styled.ChatCreator__Wrapper}>
                <input
                    placeholder="Search chat"
                    type="text"
                    value={val}
                    onChange={changeInputHandler}
                    onFocus={focusInputHandler}
                    onBlur={() => {closeListHandler.wait()}}
                    />
            </div>
            <div className={styled.ChatCreator__List}>
                <div
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
                <div
                    className={styled.ChatCreator__List__Button}
                    style=
                    {
                        viewButton === true
                        ? {display: 'block'}
                        : {display: 'none'}
                    }>
                        <button
                            className="Button primary">
                                Create&nbsp;
                                <span
                                    className={styled.ChatCreator__List__Button__ChatName}>
                                     {`"${val}"`} 
                                </span>
                                &nbsp;chat
                        </button>
                </div>
                
            </div>
        </div>
    )
}

export default withChatCreator(ChatCreator)