import axios from 'axios';
import { errorToast, successToast } from '../Components/SubComponents/Toastify';
import { replaceBasket } from '../features/basket/basketSlice';
import getReservedCardsList from './getReservedCardsList';

const removeLineItem = (item, reservationID) => async (dispatch) => {
    let csrfToken = localStorage.getItem('csrfToken');
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

    const updatedItem = {
        ...item,
        hold: false,
        name: item.name,  // Include required fields
        id_reservation: reservationID,  // Include required fields
    };

    console.log(updatedItem)
    console.log(reservationID)
  
    return axios
      .put(`lineitem/${item.id}/remove_from_basket/`, {
        id_reservation: reservationID,
        name: item.name
      })  // Assuming you have an endpoint to update a line item by its ID
      .then(function (response) {
        successToast('Your item has been successfully removed from the basket.');
  
        // Dispatch the change to Redux state and update the basket
        dispatch(replaceBasket(response.data));
        // Optionally, dispatch an action to update reserved cards list
        dispatch(getReservedCardsList());
  
        return response.data.url;
      })
      .catch(function (error) {
        console.log('Error removing line item:', error);
        errorToast('Something went wrong, and your item was not removed successfully.');
      });
}

export default removeLineItem;
