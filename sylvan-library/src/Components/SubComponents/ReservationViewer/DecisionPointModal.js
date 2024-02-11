import { Modal, Button } from 'react-bootstrap';
import { decisionPoint } from '../../../AppConstants';
import decisionPointAdvance from '../../../apiActions/decisionPointAdvance';
import { useSelector } from 'react-redux';
import getSubmittedReservations from '../../../apiActions/getAllReservations';
import { useEffect } from 'react';

const DecisionPointModal = ({ show, handleClose, decision, reservation }) => {

    const csrfToken = useSelector(state => state.user.csrfToken)
    const userID = useSelector(state => state.user.userID)

    useEffect(() => {
        getSubmittedReservations(userID)
    }, [])

    if (!decision) return null

    //handle what happens when you click a button
    let acceptMethod = ''
    let declineMethod = ''

    //handle what action is being handled by the decisionPointAdvance for accept or decline
    switch (decision.id) {
        case decisionPoint.borrower_accepts_contents:
            acceptMethod = 'accept_delivery'
            declineMethod = 'decline_delivery'
            break;
        case decisionPoint.lender_received_by_due_date:
            acceptMethod = 'return_cards'
            declineMethod = 'mark_as_late' //this method does not exist yet.
        default:
            break;
    }


    const acceptHandler = () => {
        decisionPointAdvance(reservation.id, acceptMethod, csrfToken)
        handleClose()
    }

    const declineHandler = () => {
        decisionPointAdvance(reservation.id, declineMethod, csrfToken)
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>{decision.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {decision.description}
                </p>
                <p>
                    Selecting an option below will advance the reservation.
                </p>
                <p>
                    The red button will set this reservation as {decision.destination_on_decline}
                </p>
                <p>
                    The green button will set this reservation as {decision.destination_on_success}
                </p>
            </Modal.Body>
            <Modal.Footer className='decision-point-footer'>
                {/* reminder that for the first pass through, we are assuming that only the affirmative choices are taken  */}
                <Button variant="danger" onClick={() => console.log('Negative choice selected')}>
                    {decision.decline_button}
                </Button>
                <Button variant="success" onClick={acceptHandler}>
                    {decision.accept_button}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DecisionPointModal