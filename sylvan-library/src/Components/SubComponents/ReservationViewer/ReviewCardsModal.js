import { useEffect, useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import getReservationCardsList from '../../../apiActions/getReservationCardsList';

const ReviewCardsModal = ({ show, handleClose, reservationID }) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        // Fetch reservation cards and update the state
        getReservationCardsList(reservationID)
            .then((reservationCardsList) => {
                setList(reservationCardsList);
            })
            .catch((error) => {
                console.error('Error fetching reserved cards list:', error);
                // Handle the error if needed
            });
    }, [reservationID, show]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cards Included In this Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {list.map((item) => {
                        return (
                            <li>
                                {item.name}
                            </li>
                        )
                    })}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Alert variant='info'>
                    You are responsible for maintaining this list of cards.  All cards listed are expected to be returned at the end of the reservation.
                </Alert>
                <Button variant="secondary" onClick={handleClose} className='mt-2'>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReviewCardsModal;