/* basic get request that has no parameters to worry about.  
(very possible that we may add optional params in here to keep things simple, but erring on the side of separating things)

args:
endpoint : string | what endpoint are we hitting? | Required
onSuccess : function | what to do when the call succeeds | optional
onFailure : function | what to do when the call fails | optional
onComplete : function | what to do when the call completes, success or failure | optional

*/

import axios from "axios";
import endpointDummyProofer from "./endpointDummyProofer";

export default function get(endpoint, onSuccess, onFailure, onComplete){
    let checkedEndpoint = endpointDummyProofer(endpoint)

    axios.get(checkedEndpoint)
  .then(function (response) {
    // handle success
    console.log(response);
    if (onSuccess && typeof onSuccess == 'function'){
        onSuccess()
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    if (onFailure && typeof onFailure == 'function'){
        onFailure()
    }
  })
  .finally(function () {
    // always executed
    if (onComplete && typeof onComplete == 'function'){
        onComplete()
    }
  });
}