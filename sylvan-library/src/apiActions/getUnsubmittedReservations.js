import axios from "axios";
import { baseURL, reservationStage } from "../AppConstants";

export default async function getUnsubmittedReservations(userID) {
    try {
      const response = await axios.get(baseURL + `reservation/?stage=${reservationStage.unsubmitted}`, {
        params: {
          id_user: userID,
          //we want to get all active reservations, no need to grab every complete one
          complete: false,
          lost: false
        }
      });
  
      return response.data.results;
    } catch (error) {
      console.error('An error occurred:', error);
  
      // Return a default value or throw the error if needed
      // return { error: 'An error occurred.' };
      throw error;
    }
  }