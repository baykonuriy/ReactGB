import React, {useReducer} from "react";
import axios from "axios";
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from "../types";
import { GitHubContext } from "./GitHubContext";
import { GitHubReducer } from "./GitHubReduser";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

const withCreds = url =>{
    return `${url}client_id=${CLIENT_ID}&client_secret${CLIENT_SECRET}`
}

export const GitHubState = ({children}) => {

    const initialState = 
    {
        user: {},
        users: [],
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GitHubReducer, initialState)

    const search = async value =>{
        setLoading()
        const response = await axios.get(
                //`https://api.github.com/search/users?q=${value}&client_id=${CLIENT_ID}&client_secret${CLIENT_SECRET}`)
                withCreds(`https://api.github.com/search/users?q=${value}&`)
            )
        
        dispatch(
            {
                type: SEARCH_USERS,
                payload: response.data.items
            })
    }

    const getUser = async name =>{
        setLoading()
        const response = await axios.get(
                //`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret${CLIENT_SECRET}`
                withCreds(`https://api.github.com/users/${name}?`)
            )
        dispatch(
            {
                type: GET_USER,
                payload: response.data
            })
    }

    const getRepos = async name =>{
        setLoading()
            const response = await axios(
                withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`)
            )
        dispatch(
            {
                type: GET_REPOS,
                dispatch: response.data
            })
    }

    const clearUsers = () =>{
        dispatch(
            {
                type: CLEAR_USERS
            })
    }

    const setLoading = () => {
        dispatch(
            {
                type: SET_LOADING
            })
    }
    const {user, users, repos, loading} = state

    return(
        <GitHubContext.Provider value={
            {
                search,
                getUser,
                getRepos,
                clearUsers,
                setLoading,
                user,
                users,
                repos,
                loading
            }
        }>
            {children}
        </GitHubContext.Provider>
    )
}