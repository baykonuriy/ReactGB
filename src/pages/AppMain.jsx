import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { fetchCustomers } from "../asyncActions/customers.js";
import {addCashAction, getCashAction} from '../store/cashReducer'
import { addCustomerAction, addManyCustomersAction, removeCustomerAction } from "../store/customerReducer";


const AppMain = () =>{
    
    const dispatch = useDispatch()
    const cash = useSelector(state => state.cash.cash)
    const customers = useSelector(state => state.customers.customers)

    const addCash = (cash) =>{
        dispatch(addCashAction(cash))
    }

    const getCash = (cash) =>{
        dispatch(getCashAction(cash))
    }

    const addCustomer = (name) =>{
        const obj = 
            {
                name: name,
                id: Date.now()
            }
        dispatch(addCustomerAction(obj))
    }

    const removeCustomer = (elem) => {
           dispatch(removeCustomerAction(elem.id))
    }

    return(
        <div className="">
            <div style={{marginTop: "20px"}}>
                {cash}
            </div>
            <h1>Main</h1>
            <div style={{marginBottom: "20px"}}>
                <div style={{width: "100%"}}>
                    <button onClick={() => addCash(Number(prompt()))}>Пополнить</button>
                    <button onClick={() => getCash(Number(prompt()))}>Снять</button>
                </div>
                <div style={{width: "100%", marginTop: "20px"}}>
                    <button onClick={() => addCustomer(prompt())}>Добавить пользователя</button>
                    <button onClick={() => dispatch(fetchCustomers())}>Добавить пользователей с сервера</button>
                </div>
            </div>
            {   
                console.log('elem',customers),
                customers.length > 0 ?
                <div className="">
                    {   
                        customers.map(elem => <div onClick={()=> removeCustomer(elem)} key={elem.id}>{elem.name}</div>
                        )
                    }
                </div>
                :
                <div className="">
                    Клиентов нет
                </div>
            }
        </div>
    )
}

export default AppMain