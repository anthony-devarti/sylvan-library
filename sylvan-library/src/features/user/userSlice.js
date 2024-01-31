import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    //this is hardcoded
    userID: null,
    userData: {},
    userStats: [],
    csrfToken: null
  },
  reducers: {
    loginUser: (state, action) => {
      if (action.payload.user) {
        state.userData = action.payload.user
        state.userID = action.payload.user.id
      }
      state.csrfToken = action.payload.csrf_token
    },
    logoutUser: (state) => {
      state.userData = {}
      state.userID = null
      state.userStats = []
      state.csrfToken = null
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  loginUser,
  logoutUser
} = userSlice.actions

export default userSlice.reducer