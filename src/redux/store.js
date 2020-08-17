import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

import reducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['wishlist']
}


const rootReducer = combineReducers({
    movieReducer: persistReducer(persistConfig, reducer)
})

const store = createStore(rootReducer, applyMiddleware(thunk))
const appPersist = persistStore(store)
 
export { store, appPersist}