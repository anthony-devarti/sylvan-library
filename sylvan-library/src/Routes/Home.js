//The home route.  This app is very simple, so this is mostly what the average user will see.
import { Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import ReservationModal from '../Components/ReservationModal';
import ReservationViewer from '../Components/ReservationViewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

/* 
some dummy data
*/
const reservations = [
    {
        "url": "http://127.0.0.1:8000/reservation/1/",
        "id_user": 0,
        "return_date": "2024-01-21T01:22:45-05:00",
        "date_created": null,
        "last_updated": null,
        "stage": "Borrowed"
    },
    // {
    //     "url": "http://127.0.0.1:8000/reservation/2/",
    //     "id_user": 0,
    //     "return_date": "2024-01-21T01:22:45-05:00",
    //     "date_created": null,
    //     "last_updated": null,
    //     "stage": "Delivered"
    // }
]

export default function Home() {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    //some useEffect that goes and gets the reservations for the current user
    //this will return the reservations array

    //store if there are reservations in a sane variable to check against
    let openReservations = reservations && reservations.length

    let reservationsPending = false  //dummy data, don't keep this

    //show a loader while we're getting information about this currentUser's reservations
    if (reservationsPending) {
        return (
            <div className='home'>
                <div className='full-screen-loader'>
                    <FontAwesomeIcon icon={faCircleNotch} spin size='7x' color='white' />
                </div>
            </div>
        )
    }

    //the most common view will be the ReservationViewer
    if (openReservations) {
        return (
            <div className='home'>
                <div className='full-screen-loader'>
                    <ReservationViewer
                        reservations={reservations}
                    />
                </div>
            </div>
        )
    }


    //the default view should be the no reservation view
    return (
        <div className='home'>
            <div className='hero-text'>Sylvan Library</div>
            <Button className='megaButton' onClick={() => handleShow()}>Reserve Cards</Button>
            <ReservationModal show={show} handleClose={handleClose} />
        </div>
    )
}
