import { createStore, combineReducers, applyMiddleware } from 'redux'
import {cashReducer} from './cashReducer'
import {customerReducer} from './customerReducer'
import { profileReducer } from './profileReduser'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { countWatcher } from '../saga/countSaga'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    cash: cashReducer,
    customers: customerReducer,
    profile: profileReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
// export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

