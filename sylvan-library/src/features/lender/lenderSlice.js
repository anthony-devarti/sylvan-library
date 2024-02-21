import { createSlice } from '@reduxjs/toolkit'

export const lenderSlice = createSlice({
  name: 'lender',
  initialState: {
    openReservations: [],
    tableLoading: false
  },
  reducers: {
    setOpenReservations: (state, action) => {
      state.openReservations = action.payload
    },
    setTableLoading: (state, action) => {
        state.tableLoading = action.payload
    }
  },
})

export const { setOpenReservations, setTableLoading } = lenderSlice.actions

export default lenderSlice.reducer