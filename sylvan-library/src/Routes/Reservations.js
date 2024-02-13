import ReservationViewer from '../Components/ReservationViewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import getUnsubmittedReservations from '../apiActions/getUnsubmittedReservations';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentReservation, setReservations } from '../features/basket/basketSlice';
import createReservation from '../apiActions/createReservation';
import { reservationStage } from '../AppConstants';
import getSubmittedReservations from '../apiActions/getAllReservations';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import UserWidget from '../Components/UserAuth/UserWidget';
import { Link } from 'react-router-dom';

const Reservations = () => {
    const dispatch = useDispatch()

    let reservations = useSelector(state => state.basket.reservations)
    let userID = useSelector(state => state.user.userID)

    const [reservationsPending, setReservationsPending] = useState(false)

    //gets reservations
    useEffect(() => {
        const fetchData = async () => {
            setReservationsPending(true);

            try {
                const unsubmittedReservations = await getUnsubmittedReservations(userID);
                const allReservations = await getSubmittedReservations(userID);

                if (allReservations && allReservations.length) {
                    dispatch(setReservations(allReservations));
                }
                if (unsubmittedReservations && unsubmittedReservations.length) {
                    dispatch(setCurrentReservation(unsubmittedReservations))
                }

                if (!unsubmittedReservations || !unsubmittedReservations.length) {
                    // Dispatch the createReservation thunk
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

    return (
        <div className='reservations'>
            <UserWidget />
            <Link to="/">
            <div className='nav-arrow'>
                <FontAwesomeIcon icon={faAngleUp} beatFade size='4x' style={{ color: '#ffffff' }} />
            </div>
            </Link>
            <div className="hero-text-upshift">Reservation View</div>
            {userID &&
                <ReservationViewer
                    reservations={reservations}
                />
            }
            {!userID &&
                <Alert variant='warning' className='mt-1'>
                    You must be logged in to view reservations.
                </Alert>
            }
        </div>
    )
}

export default Reservations