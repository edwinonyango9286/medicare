import { createSlice, PayloadAction } from '@reduxjs/toolkit'

 export type UserDataType = {
    firstName : string
    lastName : string
    email : string
    age : number
    nationalId : string
    phoneNumber : string
    countyCode : number
    countyName : string
    subcountyCode : number
    subcountyName : string
    gender : string
    image : string
  }

  export interface DataState {
    userData : UserDataType
  }
  
  const initialState: DataState = {
    userData : {
      firstName : "",
      lastName : "",
      email : "",
      age : 0,
      nationalId : "",
      phoneNumber : "",
      countyCode : 0,
      countyName : "",
      subcountyCode : 0,
      subcountyName : "",
      gender : "",
      image : ""
    }
  }


export const userDataSlice = createSlice({
    name: 'userdata',
    initialState,
    reducers: {
      setUserData: (state, action: PayloadAction<UserDataType>) => {
        state.userData = action.payload
      },
    },
  })
  
  export const { setUserData } = userDataSlice.actions
  
  export default userDataSlice.reducer
