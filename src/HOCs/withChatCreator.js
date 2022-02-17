import {useState, useMemo, useEffect,} from 'react'

export const withChatCreator = (Component) => {
       
        return({value, action}) => {
            const [val, setVal] = useState('')
            const [viewList, setViewList] = useState(false)
            const [editing, setEditing] = useState(false)
            const [viewButton, setViewButton] = useState(false)
            const filtredValues = useMemo(() => {
                if(val !== ''){
                    return value.filter(elem => elem.name.includes(val))
                } else{
                    return value
                }
               
                
            }, [value, val])
        
            useEffect(() => {
                if(editing === true){
                    if(filtredValues.length === 0 && val !== ''){
                        setViewList(false)
                    } else{
                        setViewList(true)
                    }
                }
            }, [filtredValues, editing])
        
            useEffect(() => {
                if(
                    filtredValues.length === 1 &&
                    String(val) === String(filtredValues[0].name) ||
                    val === ''){
                    
                    setViewButton(false)
                }
            }, [filtredValues, val])
        
            useEffect(() => {
                setViewList(false)
            }, [])
        
            useEffect(() => {
                return () =>{
                    clearTimeout(closeListHandler.wait)
                }
            }, [viewList])
    
            const closeListHandler = {
                wait: ()=> setTimeout(() => {
                    setViewList(false)
                    setViewButton(false)
                    setEditing(false)
                } , 100)
            }
    
            function getValueInField(val){
                action(val)
            }
        
            function changeInputHandler(e){
                setVal(e.target.value)
                setViewButton(true)
            }
        
            const focusInputHandler = () =>{
                setEditing(true)
                setViewList(true)
            }
            return(
                <Component
                    value={value}
                    action={action}
                    changeInputHandler={changeInputHandler}
                    focusInputHandler={focusInputHandler}
                    getValueInField={getValueInField}
                    viewButton={viewButton}
                    viewList={viewList}
                    val={val}
                    editing={editing}
                    closeListHandler={closeListHandler}
                    filtredValues={filtredValues}
                    />
            )
        } 
}

