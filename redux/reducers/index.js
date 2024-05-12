import {combineReducers } from 'redux'
import budgetReducer from './budgetReducer'
import { persistReducer,persistStore } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage'


const persistConfig={
    key:"root",
    storage,
    version:1
}


const myReducer=combineReducers({
    budget:budgetReducer
})

export const persistedReducer=persistReducer(persistConfig,myReducer)

export default myReducer;