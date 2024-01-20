import axios from 'axios';

export default function removeLineitem(item, onSuccess, onFailure) {

    //uh oh.  PUT isn't being allowed unless we include the primary key
    //I did not account for this.
    //that means we can change a whole lot of stuff all along the process of adding and removing
    //or we can make some custom method.

    //also, this will return more than one thing if the same card has been lent more than once.

    axios.put(item.url, {
        id_reservation: 0,
        //release the hold
        hold: false,
    })
        .then(function (response) {
            if (typeof onSuccess == 'function') {
                onSuccess()
            }
        })
        .catch(function (error) {
            if (typeof onFailure == 'function') {
                onFailure()
            }
        })
}