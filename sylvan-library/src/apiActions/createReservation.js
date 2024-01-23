import axios from 'axios';
import { baseURL } from '../AppConstants';
import { errorToast, successToast } from '../Components/SubComponents/Toastify';

export default function createReservation(userID) {
    axios.post(`${baseURL}reservation/`, {
        //this can stay hard-coded, I don't want to make a custom method
        "stage": 1,
        "id_user": userID,
        "date_created": "2024-01-21T12:34:56",
        //this is hardcoded return data
        "return_date": "2025-01-21T12:30:45.123456",
        "action_required": 1
    })
        .then(response => {
            console.log('Response:', response.data);
            // Handle the response data
            successToast('New reservation created')
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors
            errorToast('An error occured trying to create a new reservation.')
        });
}