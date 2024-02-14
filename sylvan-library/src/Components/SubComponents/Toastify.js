import { toast } from "react-toastify";

function stringCheck(text){
    if (typeof text != 'string'){
        return 'Someone tried to put something besides a string in here, probably Anthony ʕノ•ᴥ•ʔノ ︵ ┻━┻'
    }
    //maybe something that checks for string length here?

    return text
}

export function successToast(text){
    toast.success(stringCheck(text))
}

export function warningToast(text){
    toast.warning(stringCheck(text))
}

export function errorToast(text){
    toast.error(stringCheck(text))
}

export function infoToast(text){
    toast.info(stringCheck(text))
}