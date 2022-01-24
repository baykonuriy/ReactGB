import React, {useContext, useEffect} from "react";
import {useLocation, useParams} from 'react-router-dom'
import { GitHubContext } from "../context/gitHub/GitHubContext";

export const AppProfile = () => {
    const location = useLocation()
    const name = useParams().name
    const {getUser, getRepos, loading, user, repos} = useContext(GitHubContext)
    useEffect(()=>{
        getUser(name)
        // getRepos(name)
       // eslint-disable-next-line 
    }, [])
    
    return(
        <div className="">
             <h1>Prifile</h1>
        </div>
       
    )
}