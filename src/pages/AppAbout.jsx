import React, {Fragment, useContext} from "react";
import { AppSearchInput } from "../components/Search/AppSearchInput";
import { AppCard } from "../components/Card/AppCard";
import { GitHubContext } from "../context/gitHub/GitHubContext";

const AppAbout = () =>{
    const {loading, users} = useContext(GitHubContext)
    
    return(
        <Fragment>
            <h1>AppAbout</h1>
            <AppSearchInput/>
            {/* <div className="">Loading...</div> */}
            {
                loading ?
                <div className="">Loading...</div>
                :
                users.map(elem => {
                    return <AppCard user={elem} key={elem.id}/>
                })
            }
        
            
        </Fragment>
        
    )
}

export default AppAbout