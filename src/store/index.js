import { createStore, applyMiddleware } from 'redux'
import {
    configureStore,
    combineReducers
} from '@reduxjs/toolkit';
import { profileReducer } from './profileReduser'
import { chatsReduser1 } from './chats'
import { gistsReducer } from './gist';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { countWatcher } from '../saga/countSaga'
import {
    persistStore,
    persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    profile: profileReducer,
    chats: chatsReduser1,
    gists: gistsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store)
// export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

