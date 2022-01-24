import React from "react";
import styled from './FunctionButton.module.scss'

export const FunctionButton = (
    {
        children,
        title,
        disabled,
        action,
        size
    }) =>{  
    
    if(action){
        function someAction(){
            action()
        }
        return(
            <button
                style=
                    {
                        size?
                            {
                                width: size,
                                height: size
                            } :
                            null
                    }
                onClick={someAction}
                disabled={disabled}
                title={title}
                className={styled.FunctionButton}>
               {children}
            </button>
        )
    }
    if(!action){
        return(
            <button
                disabled={disabled}
                title={title}
                className={styled.FunctionButton}>
               {children}
            </button>
        )
    }
   
    
}