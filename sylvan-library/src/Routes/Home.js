//The home route.  This app is very simple, so this is mostly what the average user will see.
import { Button, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ReservationModal from '../Components/ReservationModal';
import ReservationViewer from '../Components/ReservationViewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import getReservations from '../apiActions/checkPendingReservations';
import { useDispatch, useSelector } from 'react-redux';
import { setReservations } from '../features/basket/basketSlice';
import createReservation from '../apiActions/createReservation';

export default function Home() {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let reservations = useSelector(state =>
        state.basket.reservations
    )

    let userID = useSelector(state =>
        state.user.userID
    )

    const [reservationsPending, setReservationsPending] = useState(false)

    //some useEffect that goes and gets the reservations for the current user
    //this will return the reservations array
    useEffect(() => {
        //just go get the active reservations
        const fetchData = async () => {
            setReservationsPending(true)
            try {
                //obviously the user is hardCoded as 0 right now.
                const data = await getReservations(userID);
                if (data) {
                    //if the user has an existing reservation, store that id_reservation to state
                    dispatch(
                        setReservations(data)
                    )
                }
                //if there are no reservations
                if (!data.length) {
                    console.log('there are no reservations')
                    //if the user does not have one, create one.
                    createReservation(userID)
                }
                setReservationsPending(false)
            } catch (error) {
                console.error('Error:', error);
                // Handle the error
                setReservationsPending(false)
            }
        };
        fetchData()


    }, [dispatch])

    //store if there are reservations in a sane variable to check against
    let openReservations = reservations.filter((reservation) => reservation.stage != 1)

    let thereAreOpenReservations = openReservations && openReservations.length > 0

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
    if (thereAreOpenReservations) {
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
            <Button onClick={() => createReservation(11)}>Test</Button>
        </div>
    )
}
