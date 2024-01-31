/* 
This function is called to POST a new line item each time a card is added to the basket.
iteration 1, this will simply add the item to the reserved cards

this is expecting the full item to be handed off (might be better to just be inventory id?)

*/

import axios from 'axios';
import { errorToast, successToast } from '../Components/SubComponents/Toastify';


export default function addLineItem(item, reservationID, onSuccess, onFailure) {

    let csrfToken = localStorage.getItem('csrfToken')
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;


    return axios.post('lineitem/', {
        //the reservationID here comes from redux state
        id_reservation: reservationID,
        //hold means that the item is held by a user, perhaps by putting it in their basket
        hold: true,
        id_inventory: item.inventory_id,
    })
        .then(function (response) {
            successToast(`Your item has been succesfully reserved.  It will remain reserved until you remove it or you are logged out.`)
            return response.data.url
        })
        .catch(function (error) {
            console.log('in the catch')
            console.log(error);
            errorToast(`Something went wrong and your item was not reserved sucessfully.`)
        });

}