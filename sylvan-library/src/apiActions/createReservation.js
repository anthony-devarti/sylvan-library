import axios from 'axios';
import { baseURL, reservationStage } from '../AppConstants';
import { errorToast, successToast } from '../Components/SubComponents/Toastify';
import { setCurrentReservation, setReservations } from '../features/basket/basketSlice';

const createReservation = (userID) => async (dispatch) => {
  try {
    // Check for existing reservations matching the criteria
    const response = await axios.get(`${baseURL}reservation/`, {
      params: {
        id_user: userID,
        stage: reservationStage.unsubmitted,
      },
    });

    const existingReservations = response.data.results;

    // Log the response data and its type for debugging
    console.log('Response Data:', existingReservations, 'Type:', typeof existingReservations);

    if (existingReservations.length > 0) {
      // If there's an existing reservation, set it as the current reservation
      const existingReservation = existingReservations[0];
      dispatch(setCurrentReservation([existingReservation]));

      successToast('Existing reservation found.');
      return existingReservation;
    }

    // No existing reservation found, proceed to create a new one
    const newReservationResponse = await axios.post(`${baseURL}reservation/`, {
      id_user: userID,
      date_created: "2024-01-21T12:34:56",
      return_date: "2025-01-21T12:30:45.123456",
      action_required: 1,
      stage: reservationStage.unsubmitted,
    });

    // Assuming the newReservationResponse.data has the necessary reservation information
    const newReservation = newReservationResponse.data;

    successToast('New reservation created.');

    // Dispatch the new reservation data to the Redux store
    dispatch(setCurrentReservation([newReservation]));

    // Return the newReservation for potential further use
    return newReservation;
  } catch (error) {
    console.error('Error:', error);
    errorToast('An error occurred trying to create or retrieve a reservation.');
    throw error; // Re-throw the error so that the calling code can handle it if needed
  }
};

export default createReservation;