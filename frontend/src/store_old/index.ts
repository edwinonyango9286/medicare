import { configureStore } from '@reduxjs/toolkit'
import RefreshSlice from './reducers/RefreshSlice'
import UserData from './reducers/UserData'

export const store = configureStore({
  reducer: {
    refresh : RefreshSlice,
    userdata: UserData,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch