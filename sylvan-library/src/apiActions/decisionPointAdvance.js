/**
 * Advances the decision point associated with a reservation to the specified destination.
 *
 * @param {number} reservationId - The unique identifier of the reservation.
 * @param {string} destination - The destination to which the decision point should advance.
 * @param {string} csrfToken - The CSRF token for authentication.
 * @returns {Promise<Object>} A Promise that resolves to an object containing updated reservation details.
 * @throws Will throw an error if the API call fails or if the reservation with the given ID is not found.
 * @example
 * // Example usage
 * const reservationId = 123; // Replace with the actual reservation ID
 * const destination = 'accept_delivery'; // Replace with the actual destination
 * const csrfToken = 'your-csrf-token'; // Replace with the actual CSRF token
 * const updatedReservation = await decisionPointAdvance(reservationId, destination, csrfToken);
 * console.log(updatedReservation); // Log the details of the updated reservation
 */
import axios from 'axios';
import { errorToast, successToast } from '../Components/SubComponents/Toastify';

const decisionPointAdvance = async (reservationId, destination, csrfToken) => {
    try {
        const response = await axios.post(`/reservation/${reservationId}/${destination}/`, {}, {
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });
        if (response.status === 200){
            successToast(response.messsage)
        }
        return response.data;
    } catch (error) {
        console.error(`Error advancing decision point for reservation ID ${reservationId}:`, error);
        errorToast(error)
        throw error;
    }
}

export default decisionPointAdvance;
