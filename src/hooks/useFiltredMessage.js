import { useMemo } from "react"

export const useFiltredMessage = (currFilters, messages) =>{
  function recursiveFilter(filtArr, messArr){
    let currMessArr = []
    if(filtArr.length === 0){
        return messArr
    } else{
        currMessArr = messArr.filter(mess=>{
          return  mess[String(filtArr[0].name.toLocaleLowerCase())]
                  .toLocaleLowerCase().includes(filtArr[0].value.toLocaleLowerCase())
        })
       return recursiveFilter(filtArr.slice(1), currMessArr)
    }
  } 
  
  const filtredMessage = useMemo(()=>{
    if(currFilters.length === 0){
      return messages
    } else{
      return recursiveFilter(currFilters, messages)
    }
  }, [currFilters, messages])
  return filtredMessage
}

