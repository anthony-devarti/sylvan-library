/*
helper function made to prevent bad endpoints from being put in
takes an endpoint and makes sure it looks right.
I wanted this to be sassy during development because it's fun.
Let's see how long it takes for this to get annoying when it fucks up.

args: endpoint

*/

import { baseURL } from "../AppConstants"

export default function endpointDummyProofer(endpoint){
    let result

    //make sure wer'e working with a string
    if (typeof endpoint != 'string'){
        console.error('the endpointDummyProofer got an endpoint that was not a string')
        return null
    }
    //see if the string starts with the base url
    if (endpoint.startsWith(baseURL)){
        console.warn('endpoint already includes the baseurl.  Best practice is to not do this, as the baseurl will change in production.  Please leave a comment to adjust this in the future and enjoy your tech debt.')
        result = endpoint
    }

    //if it doesn't, prepend the base url to it
    if (!endpoint.startsWith(baseURL)){
        console.log('endpoint does not include the baseUrl, prepending')
        result = baseURL + endpoint
    }

    //make sure that the endpoint ends with a /
    if (!endpoint.charAt(endpoint.length-1) == '/'){
        console.warn("Don't forget to add a / to the end of your endpoint.  The dummyproofer is doing this for you, currently.  The goal is to not have the dummyproofer save you, though")
        result += '/'
    }

    //check to see if the endpoint starts with a /
    if (endpoint.charAt(0) == '/'){
        console.warn("There is a / to the beginning of your endpoint.  The dummyproofer is removing this for you, currently.  The goal is to not have the dummyproofer save you, though")
    }


    //make sure there aren't any double / besides the https://
    let check = endpoint.replace('https://', '')
    if (check.includes('//')){
        console.error('There is a // somewhere that is not expected.  Something went wrong.')
        return null
    }

    //finally, return the good endpoint
    return result
}