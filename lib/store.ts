import { configureStore, combineReducers, Store } from '@reduxjs/toolkit'
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper'
import { authSlice } from './slices/auth'
import { frogsSlice } from './slices/frogs'

const combinedReducers = combineReducers({
  authReducer: authSlice.reducer,
  frogsReducer: frogsSlice.reducer,
})

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  }
  return combinedReducers(state, action)
}

export const store: Store = configureStore({
  reducer: rootReducer,
})
const makeStore: MakeStore = () => store

export type ThunkDispatch = typeof store.dispatch

export const wrapper = createWrapper(makeStore, { storeKey: 'key' })
