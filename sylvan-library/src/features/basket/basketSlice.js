import { createSlice } from '@reduxjs/toolkit'
import cartTotal from '../../utilities/cartTotal'

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    contents: [],
    total: 0,
    value: 0,
    expirationTime: 'today', //expiration time should be the start of the basket session plus 30 minutes?
    reservedCards: [],
    reservations: [],
    openReservation: null
  },
  reducers: {
    addItem: (state, action) => {
      //add the item to the basket
      state.contents.push(action.payload)
      //update the value whenever an item is added
      state.value = cartTotal(state.contents)
      //handle reservedCards list changes
      state.reservedCards.push(action.payload.inventory_id)
    },
    removeItem: (state, action) => {
      state.contents = state.contents.filter((item) => item.inventory_id != action.payload.inventory_id)
      if (state.contents.length < 1) {
        state.contents = []
        state.value = 0
      }
      //update the value whenever an item is removed
      if (state.contents.length) state.value = cartTotal(state.contents)
      //update the reserved cards list with one item
      state.reservedCards = state.reservedCards.filter((item) => item != action.payload.inventory_id)
    },
    updateReservedCards: (state, action) => {
      state.reservedCards = action.payload
    },
    replaceBasket: (state, action) => {
      state.contents = action.payload
    },
    setReservations: (state, action) => {
      console.log(action.payload)
      let newReservations = action.payload
      state.reservations = newReservations
      let pendingReservations = newReservations.filter((reservation) => reservation.stage == "Pending" && reservation.complete == false)
      //if there is only one reservation in pending
      if (pendingReservations.length > 1) {
        console.error('Somehow, this user has multiple pending reservations.  This should not happen')
      }
      state.openReservation = pendingReservations[0].id
      if (!pendingReservations) console.log('Somehow, there are no reservations')
    },
    //todo: add this functionality back
    // clearCart: () => {
    //   return(
    //     initialState
    //   )
    // },
  },
})

// Action creators are generated for each case reducer function
export const {
  addItem,
  removeItem,
  clearCart,
  updateReservedCards,
  addItemToReservedCards,
  replaceBasket,
  setReservations
} = basketSlice.actions

export default basketSlice.reducer