import { createSlice } from '@reduxjs/toolkit'
import cartTotal from '../../utilities/cartTotal'

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    contents: [],
    total: 0,
    value: 0,
    expirationTime: 'today' //expiration time should be the start of the basket session plus 30 minutes?
  },
  reducers: {
    addItem: (state, action) => {
      state.contents.push(action.payload)
      //update the value whenever an item is added
      state.value = cartTotal(state.contents)
    },
    removeItem: (state, action) => {
      state.contents = state.contents.filter((item) => item.inventory_id != action.payload.inventory_id)
      if (state.contents.length < 1) {
        state.contents = []
        state.value = 0
      }
      //update the value whenever an item is removed
      if (state.contents.length) state.value = cartTotal(state.contents)
    },
    // clearCart: () => {
    //   return(
    //     initialState
    //   )
    // },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearCart } = basketSlice.actions

export default basketSlice.reducer