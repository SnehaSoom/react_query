import { legacy_createStore as createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './Reducer'
import { apiSlice } from '../endpoints/apislice'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  // persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
 
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [apiSlice.reducerPath],
  // blacklist: ['auth'], // Don't persist the 'auth' slice of the state
  // whitelist: ['settings'], // Only persist the 'settings' slice of the state
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiSlice.middleware),
  })
  let persistor = persistStore(store)
  return { store, persistor }
}
