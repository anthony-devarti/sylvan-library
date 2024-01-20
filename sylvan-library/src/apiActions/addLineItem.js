/* 
This function is called to POST a new line item each time a card is added to the basket.
iteration 1, this will simply add the item to the reserved cards

this is expecting the full item to be handed off (might be better to just be inventory id?)

*/

import axios from 'axios';


export default function addLineItem(item, onSuccess, onFailure) {

    let result = ''

    return axios.post('lineitem/', {
        //it's ok that this is 0, because there is no reservation to attach it to, yet.
        //the card is held, but just floating out there without a 'reservation' yet.
        id_reservation: 0,
        //hold means that the item is held by a user, perhaps by putting it in their basket
        hold: true,
        id_inventory: item.inventory_id,
    })
        .then(function (response) {
            if (typeof onSuccess == 'function') {
                onSuccess()
            }
            return response.data.url
        })
        .catch(function (error) {
            console.log('in the catch')
            console.log(error);
            if (typeof onFailure == 'function') {
                onFailure()
            }
        });

}