import React from "react";
import { Link } from "react-router-dom";

export const AppCard = ({user}) =>{
    return(
        <div className="card">
            <div className="card__body">
                <h5 className="card__body__title">
                    {user.login}
                    <Link
                        to={'/profile/' + user.login}
                        className="card__body__title__btn btn btn-primary">
                        Open
                    </Link>
                </h5>
            </div>
        </div>
    )
}