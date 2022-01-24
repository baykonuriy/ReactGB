import { useMemo } from "react"

export const useColdPage = (filtredMessage, messages) => {
    const ColdPage = useMemo(()=>{
        if
        ( messages.length === 0 ||
          messages.length === 0 && filtredMessage.length === 0)
        { return 'NotMessages'}
        if
        ( messages.length > 0 && filtredMessage.length === 0)
        {return 'NotFound'}
        else
        {return false}
      
      }, [filtredMessage, messages])
    return ColdPage
}