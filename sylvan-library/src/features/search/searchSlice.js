import { createSlice } from '@reduxjs/toolkit'
import cartTotal from '../../utilities/cartTotal'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    resultsFromEcho: [],
    borrowedCards: [],
    searchTerm: '',
    searchResults: []
  },
  reducers: {
    searchItem: (state, action) => {
      //make the call to echo to check inventory
      //make the call to our server to check if any of those inventory ids are currently being borrowed
      //if any are, remove those inventory ids from the search results
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchItem } = searchSlice.actions

export default searchSlice.reducer