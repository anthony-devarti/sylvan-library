/* 
This function is called to POST a new line item each time a card is added to the basket.
iteration 1, this will simply add the item to the reserved cards

this is expecting the full item to be handed off (might be better to just be inventory id?)

*/

import axios from 'axios';
import getReservedCardsList from './getReservedCardsList';

export default function addLineItem(item, onSuccess, onFailure){

    axios.post('lineitem/', {
        //it's ok that this is 0, because there is no reservation to attach it to, yet.
        //the card is reserved, but just floating out there without a 'reservation' yet.
        id_reservation: 0,
        //hold means that the item is held by a user, perhaps by putting it in their basket
        hold: true,
        id_inventory: item.inventory_id,
      })
      .then(function (response) {
        console.log(response);
        if (typeof onSuccess == 'function'){
            onSuccess()
        }
        //this is where the reserved cards list must be updated, 
        //it will only do this when successful, so we can just update the redux store here (can we?)
        getReservedCardsList()
      })
      .catch(function (error) {
        console.log('in the catch')
        console.log(error);
        if (typeof onFailure == 'function'){
            onFailure()
        }
      });

}