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
import { decisionPoint, openReservationMessages, reservationStage } from '../../../AppConstants';
import dateTimeFormatter from '../../../utilities/dateTimeFormatter';
import calculateTimeDifference from '../../../utilities/calculateTimeDifference';
import { useEffect, useState } from 'react';
import NotificationFlag from './NotificationFlag';
import ReviewCardsModal from './ReviewCardsModal';
import getRequiredActionDetails from '../../../apiActions/getRequiredActionDetails';
import DecisionPointModal from './DecisionPointModal';

export default function ReservationCard({ reservation }) {
    //unique modal to view cards in the current reservation
    //don't plan on using this anywhere else, so I'll keep it here.
    //this needs to be at the top so we're not calling hooks conditionally
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDecisionPointModal, setShowDecisionPointModal] = useState(false);
    const handleCloseDecisionPointModal = () => setShowDecisionPointModal(false);
    const handleShowDecisionPointModal = () => setShowDecisionPointModal(true);

    const [actionDetails, setActionDetails] = useState(null)

    //borrowerActionRequired checks...
    const borrowerActionRequired = 
    reservation.action_required != decisionPoint.none &&  //if any action is required on this reservation
    actionDetails?.responsibility == 'borrower' //if there are, that we wait for the action, then check if it's the borrower's responsibility

    const defaultState = reservation.defaultState //this should be a boolean

    useEffect(() => {
        const fetchData = async () => {
            try {
                const details = await getRequiredActionDetails(reservation.action_required);
                setActionDetails(details);
            } catch (error) {
                console.error('Error fetching required action details:', error);
                // Handle error if needed
            }
        };

        if (reservation) {
            fetchData();
        }
    }, [reservation]);



    if (!actionDetails) return null

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

    return (
        <Card
            bg='dark'
            key={reservation.url}
            text='white'
            className='reservation-card'
        >
            <Card.Header>
                <h1>
                    Reservation #{reservation.id}
                </h1>
            </Card.Header>
            <Card.Body>
                {/* this section handles notifications if necessary  */}
                {borrowerActionRequired &&
                    <NotificationFlag notiType={'warning'} mousoverMessage={actionDetails.description} />
                }
                {defaultState &&
                    <NotificationFlag notiType={'danger'} mousoverMessage={'This reservation has defaulted. Meaning that your continued standing in this program is under review.  Please return any cards borrowed this way immediately.  Please do not attempt to create any new Reservations until contacted by the Lender.'} />
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
                        {borrowerActionRequired &&
                            <Col>
                                <Button onClick={handleShowDecisionPointModal}>
                                    {actionDetails.button_text}
                                </Button>
                                <DecisionPointModal
                                    show={showDecisionPointModal}
                                    handleClose={handleCloseDecisionPointModal}
                                    decision={actionDetails}
                                    reservation={reservation}
                                />
                            </Col>
                        }
                    </Row>
                </Card.Footer>
            </Card.Body>
            <ReviewCardsModal show={show} handleClose={handleClose} reservationID={reservation.id} />
        </Card>
    )
}