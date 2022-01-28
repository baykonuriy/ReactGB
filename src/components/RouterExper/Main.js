import React from "react";
import { Outlet } from "react-router-dom";


export const MainPage = () => {

    return(
        <div>
            <p>MainExpPage</p>
            <Outlet/>
        </div>
    )
}