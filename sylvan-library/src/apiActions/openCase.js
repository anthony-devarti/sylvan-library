import axios from 'axios';
import { baseURL } from '../AppConstants';
import { errorToast, successToast } from '../Components/SubComponents/Toastify';

const openCase = async (formValues) => {
    try {
        // If entireReservationUndelivered is true, include all line items in lineItemProblems
        let finalLineItemProblems = formValues.lineItemProblems;
        if (formValues.entireReservationUndelivered) {
            // Assuming lineItems is an array of all line items associated with the reservation
            const allLineItems = formValues.lineItems.map(lineItem => ({ id: lineItem.id, issue: 'entire_reservation_undelivered' }));
            finalLineItemProblems = allLineItems;
        }
        
        const response = await axios.post(
            `${baseURL}reservation/${formValues.reservationID}/open_case/`,  // Replace with your actual endpoint
            {
                reservation_id: formValues.reservationID,
                entire_reservation_undelivered: formValues.entireReservationUndelivered,
                line_item_problems: finalLineItemProblems,
                note: formValues.note,
                id_user: formValues.userID
            }
        );

        successToast(response.data.message);
    } catch (error) {
        // Handle errors
        console.error(error);
        errorToast(error.message);
    }
};

export default openCase;
