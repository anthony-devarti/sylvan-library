import getReservedCardsList from "../apiActions/getReservedCardsList"
import { useDispatch, useSelector } from "react-redux"
import { updateReservedCards } from "../features/basket/basketSlice"
import { useEffect } from "react"

let currentReservedCards = await getReservedCardsList()

export default function AvailabilityCheck() {

    //something that runs the api call that checks the lent cards once per minute
    //this will be stored in redux
    //popping this component onto the home screen will force a rerender when needed.
    const dispatch = useDispatch()
    const reservedCardsInState = useSelector(state =>
        state.basket.reservedCards
    )

    function compareLists(inState, fromAPI) {
        let arr1 = inState.toSorted((a, b) => a - b)
        let arr2 = fromAPI.toSorted((a, b) => a - b)

        if (arr1.length != arr2.length) {
            return false
        }

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i])
                return false;
        }

        return true
    }

    function updateReservedCardsList(list) {
        dispatch(
            updateReservedCards([
                ...list
            ])
        )
    }

    useEffect(() => {
        console.log('in the useEffect')
        if(!compareLists(reservedCardsInState, currentReservedCards)){
            updateReservedCardsList(currentReservedCards)
        }
    }, [currentReservedCards])

    //todo: repeat this process every 90 seconds (too often?  No idea how annoying this is.  Might need to be longer.)

    return (
        <>
        </>
    )
}