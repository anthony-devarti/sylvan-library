/* 
This component is designed to replace the default view if the user has open reservations.
This should change what is visible on the homepage directly, and include a ReservationCard for each reservation.
This will be rendered on the home page based on available reservations, so the reservations present will already be available if this is being rendered

Reservations passed to this should be an array of objects

Change the plan here, it should assume there is one reservation with full details, 
and the second reservation should be assumed to be an exception and might need to be handled 
some other way like a carousel or some other switcher mechanism


*/

import ReservationCard from "./SubComponents/ReservationViewer/ReservationCard"
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import ReservationModal from "./ReservationModal";

export default function ReservationViewer({ reservations }) {

    const [current, setCurrent] = useState(0);

    //handle showing newReservationModal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    //just in case something gets fucked, just set current back to 0
    if (current > current.length) {
        setCurrent(0)
    }


    if (reservations && Array.isArray(reservations) && reservations.length) {

        return (
            <div className="reservation-viewer">
                <div className="hero-text-upshift">Sylvan Library</div>
                <div className="reservation-card-container">
                    <div>
                        <ReservationCard reservation={reservations[current]} />
                    </div>
                    <div className="reservation-switcher">
                        {/* if there are more reservations than one, and the current is not the first, show the back button  */}
                        {reservations.length > 1 && current > 0 &&
                            <div>
                                <Button className="next-button" onClick={() => setCurrent(current - 1)}>
                                    <FontAwesomeIcon icon={faAngleLeft} /> Previous Reservation
                                </Button>
                            </div>
                        }
                        {/* if there are more reservations to see, show the next button  */}
                        {reservations.length > 1 && current < reservations.length + 1 &&
                            <div>
                                <Button className="next-button" onClick={() => setCurrent(current + 1)}>
                                    Next Reservation <FontAwesomeIcon icon={faAngleRight} />
                                </Button>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <Button className='mini-reservation-button'
                        onClick={handleShow}
                    >
                        <FontAwesomeIcon icon={faPlus} size="3x"/>
                    </Button>
                </div>
                <ReservationModal show={show} handleClose={handleClose} />
            </div>
        )
    }

    //it should only reach this if the reservations passed in is not an array of objects.
    return null
}