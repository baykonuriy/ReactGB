import {useEffect, useState, useCallback} from "react";
import { getGistsMiddleware } from "../MiddlewaresThunk/gists";
import { resetGiststatus } from "../store/gist/actions";
import { useDispatch } from "react-redux";

export const withGistsPage = (Component) => {
    return ({gists, err}) => {
        const dispatch = useDispatch()
        const [loading, setLoading] = useState(false)

        const getGistsUsers = useCallback(() => {
            dispatch(resetGiststatus())
            dispatch(getGistsMiddleware())
        }, [])

        useEffect(() => {
            dispatch(getGistsMiddleware())
        }, [])
        useEffect(() => {
            if(gists.length === 0 && !err){
                setLoading(true)
            } else{
                setLoading(false)
            }
        }, [gists, err])
        return(
            <Component
                loading={loading}
                getGistsUsers={getGistsUsers}
                gists={gists}
                err={err}
                    />)
    }
}