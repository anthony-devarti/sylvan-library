import axios from 'axios';
import { replaceBasket } from '../features/basket/basketSlice';

const getBasketContentsThunk = (reservationID) => async (dispatch) => {
  try {
    const response = await axios.get('lineitem/', {
      params: {
        hold: true,
        id_reservation: reservationID,
      },
    });

    // Assuming the response.data contains the array of line items
    const basketContents = response.data.results;

    // Dispatch an action to update the basket in the Redux store
    dispatch(replaceBasket(basketContents));
  } catch (error) {
    console.error('Error fetching reserved line items:', error);
    // You can handle errors or dispatch additional actions if needed
    throw error;
  }
};

export default getBasketContentsThunk;