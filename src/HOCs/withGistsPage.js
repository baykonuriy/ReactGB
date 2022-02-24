import { useEffect, useState, useCallback, useContext } from "react";
import { getGistsMiddleware } from "../MiddlewaresThunk/gists";
import { resetGiststatus } from "../store/gist/actions";
import { useDispatch } from "react-redux";
import { FirebaseContext } from "../context";
import { rootRef } from "../services/firebase";


export const withGistsPage = (Component) => {
    
    return ({gists, err}) => {

        const {db} = useContext(FirebaseContext)
        const [content, setContent] = useState()
        const changeCont = useCallback((snapshot) => {
            setContent(snapshot.val())
        }, [])

        useEffect(() => {
            rootRef.on('value', changeCont)
            return () => {
                rootRef.off('value', changeCont)
            }
        }, [])

        useEffect(() => {
            console.log('cont', content)
        }, [content])

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