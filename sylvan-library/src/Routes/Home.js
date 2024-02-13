//The home route.  This app is very simple, so this is mostly what the average user will see.
import { Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import ReservationModal from '../Components/ReservationModal';
import UserWidget from '../Components/UserAuth/UserWidget';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Home() {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let userID = useSelector(state => state.user.userID)

    //the default view should be the no reservation view
    return (
        <div className='home'>
            <UserWidget />
            <div className='hero-text'>Sylvan Library</div>
            <Button className='megaButton' disabled={!userID} onClick={() => handleShow()}>Reserve Cards</Button>
            {!userID &&
                <Alert variant='warning' style={{position: 'absolute', top:'80px', left:'0', right:'0'}}>
                    You must be logged in to reserve cards.
                </Alert>
            }
            <ReservationModal show={show} handleClose={handleClose} />
            <Link to="/reservations">
                <div className='nav-arrow'>
                    Check Existing Reservations
                    <div>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            beatFade size='4x'
                            style={{ color: '#ffffff' }}
                        />
                    </div>
                </div>
            </Link>
        </div>
    )
}
