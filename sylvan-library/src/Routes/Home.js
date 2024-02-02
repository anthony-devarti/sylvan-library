//The home route.  This app is very simple, so this is mostly what the average user will see.
import { Button, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ReservationModal from '../Components/ReservationModal';
import ReservationViewer from '../Components/ReservationViewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import getUnsubmittedReservations from '../apiActions/getUnsubmittedReservations';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentReservation, setReservations } from '../features/basket/basketSlice';
import createReservation from '../apiActions/createReservation';
import UserWidget from '../Components/UserAuth/UserWidget';
import { reservationStage } from '../AppConstants';
import getSubmittedReservations from '../apiActions/getAllReservations';

export default function Home() {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let reservations = useSelector(state => state.basket.reservations)
    let userID = useSelector(state => state.user.userID)

    const [reservationsPending, setReservationsPending] = useState(false)

    //some useEffect that goes and gets the reservations for the current user
    useEffect(() => {
        const fetchData = async () => {
            setReservationsPending(true);

            try {
                const unsubmittedReservations = await getUnsubmittedReservations(userID);
                const allReservations = await getSubmittedReservations(userID);

                if (allReservations && allReservations.length) {
                    console.log('setting reservations')
                    dispatch(setReservations(allReservations));
                }
                if (unsubmittedReservations && unsubmittedReservations.length) {
                    console.log('setting current reservation')
                    dispatch(setCurrentReservation(unsubmittedReservations))
                }

                if (!unsubmittedReservations || !unsubmittedReservations.length) {
                    // Dispatch the createReservation thunk
                    console.log('create a new reservation')
                    createReservation(userID)(dispatch)
                }

                setReservationsPending(false);
            } catch (error) {
                console.error('Error:', error);
                setReservationsPending(false);
            }
        };

        if (userID) {
            fetchData();
        }
    }, [userID]);

    //store if there are reservations in a sane variable to check against
    let openReservations = reservations.filter((reservation) => reservation.stage != reservationStage.unsubmitted)

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
                <UserWidget />
                {userID &&
                    <div className='full-screen-loader'>
                        <ReservationViewer
                            reservations={reservations}
                        />
                    </div>
                }
                {!userID &&
                    <Alert variant='warning' className='mt-1'>
                        You must be logged in to reserve cards.
                    </Alert>
                }
            </div>
        )
    }


    //the default view should be the no reservation view
    return (
        <div className='home'>
            <UserWidget />
            <div className='hero-text'>Sylvan Library</div>
            <Button className='megaButton' disabled={!userID} onClick={() => handleShow()}>Reserve Cards</Button>
            {!userID &&
                <Alert variant='warning' className='mt-1'>
                    You must be logged in to reserve cards.
                </Alert>
            }
            <ReservationModal show={show} handleClose={handleClose} />
        </div>
    )
}
