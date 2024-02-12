import axios from 'axios';
import { baseURL } from '../AppConstants';
import { replaceBasket } from '../features/basket/basketSlice';
import { successToast, errorToast } from '../Components/SubComponents/Toastify';

const clearBasket = (reservationID) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseURL}reservation/${reservationID}/clear_basket/`);

    // Assuming the response.data has the necessary information
    const { message, items } = response.data;

    // Dispatch the replaceBasket action with the updated basket data
    dispatch(replaceBasket([]));

    // Show a success toast
    successToast(
        message
        +
        'The released items will again appear in search results'
        );
  } catch (error) {
    console.error('Error clearing basket:', error);

    // Show an error toast with the response error message
    errorToast(`Error clearing basket: ${error.response.data.error}`);
    throw error; // Re-throw the error so that the calling code can handle it if needed
  }
};

export default clearBasket;
