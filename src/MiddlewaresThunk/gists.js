import
{
    getGistsSuccessAction,
    getGistsFailureAction,
    getGistRequestAction
} from "../store/gist/actions"

export const getGistsMiddleware = () => {

    return async (dispatch) => {
        dispatch(getGistRequestAction())
        try{
            const response = await fetch('https://api.github.com/gists/public')
            if(!response.ok){
                throw new Error(`The request failed ${response.status}`)
            }
            const result = await response.json()
            dispatch(getGistsSuccessAction(result))
        } catch(err){
            console.log('errrr', err.message)
            dispatch(getGistsFailureAction(err.message))
        }
    }
}