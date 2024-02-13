import axios from "axios";
import { baseURL, reservationStage } from "../AppConstants";

export default async function getSubmittedReservations(userID) {
  try {
    const response = await axios.get(baseURL + `reservation/`, {
      params: {
        id_user: userID,
        //we want to get all active reservations, no need to grab every complete one
        complete: false,
        lost: false
      }
    });

    // Filter out unsubmitted reservations
    const submittedReservations = response.data.results.filter(reservation => reservation.stage !== reservationStage.unsubmitted);
    return submittedReservations;
  } catch (error) {
    console.error('An error occurred:', error);

    // Return a default value or throw the error if needed
    // return { error: 'An error occurred.' };
    throw error;
  }
}