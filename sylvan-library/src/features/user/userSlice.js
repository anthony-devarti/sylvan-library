import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    //this is hardcoded
    userID: null,
    userData: {},
    userStats: [],
  },
  reducers: {
    loginUser: (state, action) => {
      state.userData = action.payload
      state.userID = action.payload.id
    },
    logoutUser: (state) => {
      state.userData = {}
      state.userID = null
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  loginUser,
  logoutUser
} = userSlice.actions

export default userSlice.reducer