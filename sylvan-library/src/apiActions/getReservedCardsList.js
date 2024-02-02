/* 
Action to get an array of reserved cards.  We don't want this to dispatch to redux unless there is a change in the list.

This is a unitasker function, and should only be used to get the list of reserved cards, so it should not take any args because it will ALWAYS do the same thing

This should just return an array of inventory ids of all cards from the collection that are currently reserved.
*/

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../AppConstants";
import { updateReservedCards } from "../features/basket/basketSlice"; // Import the action creator

// Define the Redux Thunk using createAsyncThunk
const getReservedCardsList = createAsyncThunk(
  "basket/getReservedCardsList",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(baseURL + "lineitem/", {
        params: {
          hold: true,
        },
      });

      const result = response.data.results;
      const reservedArray = result.map((item) => item.id_inventory);

      // Dispatch the updateReservedCards action with the reserved cards
      dispatch(updateReservedCards(reservedArray));

      return reservedArray;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error so that the calling code can handle it if needed
    }
  }
);

export default getReservedCardsList;