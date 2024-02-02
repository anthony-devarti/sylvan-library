import { createSlice } from '@reduxjs/toolkit'
import cartTotal from '../../utilities/cartTotal'
import { reservationStage } from '../../AppConstants'

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    contents: [],
    total: 0,
    value: 0,
    expirationTime: 'today', //expiration time should be the start of the basket session plus 30 minutes?
    reservedCards: [],
    reservations: [],
    openReservationID: null,
    openReservationUrl: null
  },
  reducers: {
    updateReservedCards: (state, action) => {
      state.reservedCards = action.payload
    },
    replaceBasket: (state, action) => {
      state.contents = action.payload
    },
    setReservations: (state, action) => {
      state.reservations = action.payload
    },
    setCurrentReservation: (state, action) => {
      state.openReservationID = action.payload[0].id
      state.openReservationUrl = action.payload[0].url
    }
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
  clearCart,
  updateReservedCards,
  addItemToReservedCards,
  replaceBasket,
  setReservations,
  setCurrentReservation
} = basketSlice.actions

export default basketSlice.reducer