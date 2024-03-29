/**
 * Submits a reservation with the given URL and then dispatches the newly created reservation to the state.
 * 
 * @param {string} reservationUrl - The URL of the reservation to be submitted.
 * @param {string} userId - The ID of the user for whom the new reservation is being created.
 * @param {Object} reservationData - Additional data for the reservation (note, returnDate, pickupMethod, pickupDate).
 * @returns {Function} A Redux Thunk function that can be dispatched to perform the submission and state update.
 * @throws Will throw an error if the reservation URL is invalid or if an error occurs during submission.
 * @example
 * // Example usage
 * const reservationUrl = '/reservation/123/'; // Replace with the actual reservation URL
 * const userId = '456'; // Replace with the actual user ID
 * const reservationData = {
 *   note: 'Additional note',
 *   returnDate: '2022-02-28',
 *   pickupMethod: 'In-person',
 *   pickupDate: '2022-02-27T12:00',
 * };
 * const thunkFunction = submitReservation(reservationUrl, userId, reservationData);
 * dispatch(thunkFunction);
 */
import axios from "axios";
import { successToast, errorToast } from "../Components/SubComponents/Toastify";
import createReservation from "./createReservation";
import { setCurrentReservation, setReservations } from "../features/basket/basketSlice";

const submitReservation = (reservationUrl, userId, reservationData) => async (dispatch) => {
  console.log('in submit reservation')
  try {
    // Submit the reservation using the provided URL and additional data
    const response = await axios.post(`${reservationUrl}submit_reservation/`, reservationData);

    // Display a success toast
    successToast(response.data.message);

    // Make a new reservation
    const createReservationThunk = createReservation(userId);
    const newReservation = await dispatch(createReservationThunk);

    // Dispatch the new reservation to the state
    dispatch(setReservations([newReservation]));
    dispatch(setCurrentReservation([newReservation]));

    return { success: true, message: response.data.message, newReservation };

  } catch (error) {
    // Handle errors and display an error toast
    const errorMessage = error.response?.data?.error || 'An error occurred';
    errorToast(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export default submitReservation;
