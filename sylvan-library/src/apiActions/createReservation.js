import axios from 'axios';
import { baseURL, reservationStage } from '../AppConstants';
import { errorToast, successToast } from '../Components/SubComponents/Toastify';
import { setCurrentReservation, setReservations } from '../features/basket/basketSlice';

const createReservation = (userID) => async (dispatch) => {
    try {
      const response = await axios.post(`${baseURL}reservation/`, {
        "id_user": userID,
        "date_created": "2024-01-21T12:34:56",
        "return_date": "2025-01-21T12:30:45.123456",
        "action_required": 1,
        "stage" : reservationStage.unsubmitted
      });
  
      // Assuming the response.data has the necessary reservation information
      const newReservation = response.data;
  
      successToast('Reservation is ready');
      
      // Dispatch the new reservation data to the Redux store
      dispatch(setCurrentReservation([newReservation]));
  
      // Return the newReservation for potential further use
      return newReservation;
    } catch (error) {
      console.error('Error:', error);
      errorToast('An error occurred trying to create a new reservation.');
      throw error; // Re-throw the error so that the calling code can handle it if needed
    }
  };



export default createReservation