import React, { useState, useEffect } from 'react';
import ReservationCard from "./SubComponents/ReservationViewer/ReservationCard";
import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import getSubmittedReservations from "../apiActions/getAllReservations";

/**
 * Renders a component to view and navigate through user reservations.
 * @component
 * @returns {JSX.Element} The rendered ReservationViewer component.
 */
const ReservationViewer = () => {
    const [reservations, setReservations] = useState([]);
    const [current, setCurrent] = useState(0);
    const [show, setShow] = useState(false);

    /**
     * Fetch reservations from the API when the component mounts.
     * @function
     * @async
     */
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const latestReservations = await getSubmittedReservations(); // Replace with your actual API call
                setReservations(latestReservations);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    /**
     * Handles navigating to the previous reservation.
     * @function
     */
    const handlePrevClick = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    /**
     * Handles navigating to the next reservation.
     * @function
     */
    const handleNextClick = () => {
        if (current < reservations.length - 1) {
            setCurrent(current + 1);
        }
    };

    if (!reservations.length){
        return (
            <Alert varaint='info'>No In Progress Reservations Found</Alert>
        )
    }

    if (reservations.length > 0) {
        return (
            <div className="reservation-viewer">
                <div className="reservation-card-container">
                    <div>
                        <ReservationCard reservation={reservations[current]} />
                    </div>
                    <div className="reservation-switcher">
                        {current > 0 && (
                            <div>
                                <Button className="next-button" onClick={handlePrevClick}>
                                    <FontAwesomeIcon icon={faAngleLeft} /> Previous Reservation
                                </Button>
                            </div>
                        )}
                        {current < reservations.length - 1 && (
                            <div>
                                <Button className="next-button" onClick={handleNextClick}>
                                    Next Reservation <FontAwesomeIcon icon={faAngleRight} />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default ReservationViewer;
