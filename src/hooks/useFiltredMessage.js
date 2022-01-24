import { useMemo, useState } from "react"

export const useFiltredMessage = (
  messages
  ) =>{
  const [currFilters, setCurrFilters] = useState([])
  const [filterValue, setFilterVAlue] = useState(
    [
        {
            id: 'filter1',
            name: 'Text',
            value:''
        },
        {
            id: 'filter2',
            name: 'User',
            value:''
        }
    ]
  )

  function addFilter(filter){
    setFilterVAlue(filterValue.filter(item=>{
        return item.id !== filter.id
    }))
    setCurrFilters([...currFilters, filter])
  }

  function addValueInCurrFilter(valFilt){
    const updateFilter = currFilters.map(item=>{
        if(item.id === valFilt.id){
            return {...item, value: valFilt.value}
        }
        return item
    })
    setCurrFilters([...updateFilter])
  }
  
  function clearFilters(){
      const updateFilter = currFilters.map(item=>{
          return {...item, value: ''}
      })
      setFilterVAlue([...filterValue, ...updateFilter])
      setCurrFilters([])
  }

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

  function removeThisChips(filter){
    filter.value = ''
    setFilterVAlue([...filterValue, filter])
    const updateFilter = currFilters.filter(item=>{
        return item.id !== filter.id
    })
    setCurrFilters([...updateFilter])
  }
  
  const filtredMessage = useMemo(()=>{
    if(currFilters.length === 0){
      return messages
    } else{
      return recursiveFilter(currFilters, messages)
    }
  }, [currFilters, messages])
  return[
    currFilters,
    filterValue,
    addFilter,
    addValueInCurrFilter,
    clearFilters,
    removeThisChips,
    filtredMessage]
}

