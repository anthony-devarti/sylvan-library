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
import { openReservationMessages, reservationStage } from '../../../AppConstants';
import dateTimeFormatter from '../../../utilities/dateTimeFormatter';
import calculateTimeDifference from '../../../utilities/calculateTimeDifference';
import { useState } from 'react';
import NotificationFlag from './NotificationFlag';
import ReviewCardsModal from './ReviewCardsModal';

export default function ReservationCard({ reservation }) {
    //unique modal to view cards in the current reservation
    //don't plan on using this anywhere else, so I'll keep it here.
    //this needs to be at the top so we're not calling hooks conditionally
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const actionRequired = true //dummy data, delete this line
    //actionRequired should come from the backend, and it makes sense that it would be coming from the reservation

    const defaultState = false //dummy data, delete this line
    //default state should come from the backend, probably also from the reservation modal

    //basic assumption checking
    if (!reservation) return null
    if (typeof reservation != 'object') return null

    //handle the message that appears in the card
    let message = ''

    switch (reservation.stage) {
        case reservationStage.pending:
            message = openReservationMessages.pending
            break;
        case reservationStage.approved:
            message = openReservationMessages.approved
            break;
        case reservationStage.delivered:
            console.log('this is delivered too')
            message = openReservationMessages.delivered
            break;
        case reservationStage.borrowed:
            message = openReservationMessages.borrowed
            break;
        case reservationStage.returned:
            message = openReservationMessages.returned
            break;
        default:
            break;
    }

    console.log(reservation)


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
                {/* this section handles notifications if necessary  */}
                {actionRequired &&
                    <NotificationFlag notiType={'warning'} mousoverMessage={'Action is required for your reservation to progress.'} />
                }
                {defaultState &&
                    <NotificationFlag notiType={'danger'} mousoverMessage={'Something serious'} />
                }
                <Card.Title> <ReservationProgressBar stage={reservation.stage} /></Card.Title>
                {/* end of notificaiton section  */}
                <Card.Body>
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
                                <thead>
                                    <tr>
                                        <th style={{ fontWeight: 'normal' }}>Return Due:</th>
                                        <th style={{ fontWeight: 'normal', textAlign: 'right' }}>{dateTimeFormatter(reservation.return_date)}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            Return in:
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            {calculateTimeDifference(reservation.return_date)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Card.Body>
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
            <ReviewCardsModal show={show} handleClose={handleClose} reservationID={reservation.id}/>
        </Card>
    )
}