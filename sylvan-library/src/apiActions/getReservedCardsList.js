/* 
Action to get an array of reserved cards.  We don't want this to dispatch to redux unless there is a change in the list.

This is a unitasker function, and should only be used to get the list of reserved cards, so it should not take any args because it will ALWAYS do the same thing

This should just return an array of inventory ids of all cards from the collection that are currently reserved.
*/

import { baseURL } from "../AppConstants";
import axios from "axios";

export default function getReservedCardsList() {

    let reservedArray = []

    let result

    return axios.get(baseURL + 'lineitem/', {
        params: {
            hold: true
        }
    })
        .then((response) => {
            // handle success
            result = response.data.results
            //probably don't want to run any onSuccess type funcitons here
            let i = 0
            do {
                reservedArray.push(result[i].id_inventory)
                i++
            } while ( i < result.length)
            return reservedArray
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            //todo: there maybe should be an error toast explaining what's going on.
        })
}