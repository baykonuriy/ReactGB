export const GET_GISTS = 'GET_GISTS'
export const GET_GISTS_SUCCESS = 'GET_GISTS_SUCCESS'
export const GET_GISTS_FAILURE = 'GET_GISTS_FAILURE'
export const GET_GIST_REQUEST = 'GET_GIST_REQUEST'
export const RESET_GISTS_STATUS = 'RESET_GISTS_STATUS'

export const getGistsSuccessAction = (data) => ({type: GET_GISTS_SUCCESS, payload: data})
export const getGistsFailureAction = (err) => ({type: GET_GISTS_FAILURE, payload: err})
export const getGistRequestAction = () => ({type: GET_GIST_REQUEST})
export const resetGiststatus = () => ({type: RESET_GISTS_STATUS})