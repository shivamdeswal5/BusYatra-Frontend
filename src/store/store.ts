import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth-slice'
import profileReducer from './slice/profile-slice'
import busReducer from './slice/bus-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    bus: busReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
