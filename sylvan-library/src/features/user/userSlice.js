import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    //this is hardcoded
    userID: 1
  },
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const {
  
} = userSlice.actions

export default userSlice.reducer