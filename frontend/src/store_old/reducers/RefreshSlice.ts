import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RefreshState {
  refresh : boolean
  IsAuthenticated : boolean
}

const initialState: RefreshState = {
  refresh : false,
  IsAuthenticated: false
}

export const RefreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    setRefresh: (state) => {
      state.refresh = !state.refresh
    },
    setAuth : (state) => {
      state.IsAuthenticated = true
    },
    removeAuth : (state) => {
      state.IsAuthenticated = false
    }
  },
})

export const { setRefresh,setAuth,removeAuth} = RefreshSlice.actions

export default RefreshSlice.reducer