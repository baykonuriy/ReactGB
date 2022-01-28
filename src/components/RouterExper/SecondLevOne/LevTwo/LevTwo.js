import React, {useEffect} from "react";
import { Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";

export const LevTwo = () => {
    return(
        <div>
            <p>LevTwo</p>
            <Outlet/>
        </div>
    )
}