import ProblemForm from "../Components/Problem/ProblemForm"
import { useEffect, useState } from "react";
import getReservationCardsList from "../apiActions/getReservationCardsList";
import { useParams } from 'react-router-dom';

const Problem = () => {
    const [ list, setList ] = useState([])
    const params = useParams()

    //we might need to handle fetching information about the reservation in question here.
    useEffect(() => {
        // Fetch reservation cards and update the state
        getReservationCardsList(params.reservationID)
            .then((reservationCardsList) => {
                setList(reservationCardsList);
            })
            .catch((error) => {
                console.error('Error fetching reserved cards list:', error);
                // Handle the error if needed
            });
    }, []);

    return (
        <div className="problem">
            <ProblemForm lineItems={list} reservationID={params.reservationID}/>
        </div>
    )
}

export default Problem