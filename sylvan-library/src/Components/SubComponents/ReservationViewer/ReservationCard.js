/* 
This component should simply take a reservation object that his handed to it and render it correctly.
when clicked, it should expand to take up the full screen with additional detials

The base details included on the quickview card should be: 
the due date, 
time to due date, 
total cost liability,
action required

props:
reservation | object | this should be an individual reservation, we're checking for this

*/
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import ReservationProgressBar from './ReservationProgressBar';
import { openReservationMessages } from '../../../AppConstants';
import dateTimeFormatter from '../../../utilities/dateTimeFormatter';
import calculateTimeDifference from '../../../utilities/calculateTimeDifference';
import { useState } from 'react';

export default function ReservationCard({ reservation }) {
    //unique modal to view cards in the current reservation
    //don't plan on using this anywhere else, so I'll keep it here.
    //this needs to be at the top so we're not calling hooks conditionally
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const ReviewCardsModal = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cards Included</Modal.Title>
                </Modal.Header>
                <Modal.Body>Some list of cards attached to this reservation id</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }


    const actionRequired = false //dummy data, delete this line
    //actionRequired should come from the backend, and it makes sense that it would be coming from the reservation
    
    if (actionRequired) {
        // console.log(actionRequired)
    }

    //basic assumption checking
    if (!reservation) return null
    if (typeof reservation != 'object') return null


    //handle the message that appears in the card
    let message = ''

    switch (reservation.stage) {
        case 'Approved':
            message = openReservationMessages.approved
            break;
        case 'Delivered':
            message = openReservationMessages.delivered
            break;
        case 'Borrowed':
            message = openReservationMessages.borrowed
            break;
        case 'Returned':
            message = openReservationMessages.returned
            break;

        default:
            break;
    }


    return (
        <Card
            bg='dark'
            key={reservation.url}
            text='white'
            className='reservation-card'
        >
            <Card.Header>
                <h1>
                    Open Reservation
                </h1>
            </Card.Header>
            <Card.Body>
                <Card.Title> <ReservationProgressBar stage={reservation.stage} /></Card.Title>
                <Card.Text>
                    <Row>
                        <Col>
                            {message}
                        </Col>
                    </Row>
                    <Row className='info-row'>
                        <Col className='widget'>
                            Liability {null}
                        </Col>
                        <Col className='widget'>
                            <table style={{ width: '100%' }}>
                                <th style={{ fontWeight: 'normal' }}>Return Due:</th>
                                <th style={{ fontWeight: 'normal', textAlign: 'right' }}>{dateTimeFormatter(reservation.return_date)}</th>
                                <tr>
                                    <td>
                                        Return in:
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        {calculateTimeDifference(reservation.return_date)}
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                </Card.Text>
                <Card.Footer>
                    <Row>
                        <Col>
                            <Button onClick={handleShow}>Review Cards</Button>
                        </Col>
                        {actionRequired &&
                            <Col>
                                <Button>
                                    Address Action
                                </Button>
                            </Col>
                        }
                    </Row>
                </Card.Footer>
            </Card.Body>
            <ReviewCardsModal />
        </Card>
    )
}