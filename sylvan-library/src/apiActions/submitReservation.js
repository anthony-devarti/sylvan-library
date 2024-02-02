/**
 * Submits a reservation with the given ID.
 * 
 * @param {string|number} reservationId - The ID of the reservation to be submitted.
 * @returns {Object} An object representing the outcome of the submission.
 * @throws Will throw an error if the reservation ID is invalid or if an error occurs during submission.
 * @example
 * // Example usage
 * const reservationId = '123'; // Replace with the actual reservation ID
 * const result = submitReservation(reservationId);
 * console.log(result); // { success: true, message: 'Reservation submitted successfully' }
 */
import axios from "axios";
import { successToast, errorToast } from "../Components/SubComponents/Toastify";

const submitReservation = async (reservationId) => {
  try {
    // Parse the reservationId to ensure it's a number
    const idAsNumber = typeof reservationId === 'string' ? parseInt(reservationId, 10) : reservationId;

    if (isNaN(idAsNumber)) {
      // Handle invalid reservationId
      errorToast('Invalid reservation ID');
      return { success: false, message: 'Invalid reservation ID' };
    }

    const response = await axios.post(`/reservation/${idAsNumber}/submit_reservation/`);

    // Display a success toast
    successToast(response.data.message);

    return { success: true, message: response.data.message };

  } catch (error) {
    // Handle errors and display an error toast
    const errorMessage = error.response?.data?.error || 'An error occurred';
    errorToast(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export default submitReservation;