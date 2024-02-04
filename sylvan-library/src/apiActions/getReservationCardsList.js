import axios from 'axios';
import { errorToast } from '../Components/SubComponents/Toastify';

/**
 * Fetches the list of reserved cards associated with a specific reservation.
 *
 * @param {string} reservationID - The ID of the reservation for which to fetch the reserved cards.
 * @returns {Promise<Array>} A promise that resolves to an array of reserved cards.
 * @throws Will throw an error if the API call fails or an invalid response is received.
 * @example
 * // Example usage
 * const reservationID = '123'; // Replace with the actual reservation ID
 * try {
 *   const reservedCardsList = await getReservationCardsList(reservationID);
 *   console.log(reservedCardsList);
 *   // Handle the reserved cards list as needed
 * } catch (error) {
 *   console.error('Error fetching reserved cards list:', error);
 *   // Handle the error if needed
 * }
 */
const getReservationCardsList = async (reservationID) => {
  try {
    const response = await axios.get('lineitem/', {
      params: {
        hold: true,
        id_reservation: reservationID,
      },
    });

    // Assuming the response.data contains the array of reserved line items
    const reservationCardsList = response.data.results;

    return reservationCardsList;
  } catch (error) {
    console.error('Error fetching reserved cards list:', error);
    errorToast('An error occurred while fetching reserved cards list.');
    throw error;
  }
};

export default getReservationCardsList;