/* 
The Decision Modal is used when a user is presented with a decision that requires their attention.
The decision points are outlined in the workflow diagram.
All decision points have an affirmative and a negative option, so those options are included by default.  If you need a more complex modal, consider making one rather than using this default.

props:
    show | var | whether the modal is currently showing or not, likely should be managed by the state of the component using this component. 
    handleClose | function | something that manipulates the show variable to make it false, closing the modal (note that there may not be an option to close the modal without making a decision, but there must always be a way to close the modal) 
    agreementText | string | the text of the button that allows the user to answer affirmatively 
    onAgree | function | the function to be called when the user selects the affirmative option
    agreementPopoverText | string | optional | a string that will appear in a popover on the agreement button 
    declineText | string | the text of the button that allows the user to answer negatively
    onDecline | function | the function to be called when the user selects the negative option
    declinationPopoverText | string | optional | a string that will appear in a popover on the decline button
    message | string | the text that appears in the body of the modal (this might need to be changed to children)
*/

import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function DecisionModal({
    show,
    handleClose,
    agreementText,
    onAgree,
    agreementPopoverText,
    declineText,
    onDecline,
    declinePopoverText
}) {

    function handleDecline() {
        onDecline;
        handleClose
    }

    function handleAgree() {
        onAgree;
        handleClose
    }

    //check to make sure that the popover texts exist and are strings before the popover is created.
    const AffirmativeButton = () => {

        if (agreementPopoverText && typeof agreementPopoverText == 'string') {
            return (
                <OverlayTrigger
                    key='top'
                    placement='top'
                    overlay={
                        <Tooltip id={agreementText}>
                            {agreementPopoverText}
                        </Tooltip>
                    }
                >
                    <Button variant="success">{agreementText}</Button>
                </OverlayTrigger>
            )
        }

        return (
            <Button variant="secondary" onClick={handleAgree}>{agreementText}</Button>
        )
    }

    const NegativeButton = () => {

        if (declinePopoverText && typeof declinePopoverText == 'string') {
            return (
                <OverlayTrigger
                    key='top'
                    placement='top'
                    overlay={
                        <Tooltip id={declineText}>
                            {declinePopoverText}
                        </Tooltip>
                    }
                >
                    <Button variant="success">{declineText}</Button>
                </OverlayTrigger>
            )
        }

        return (
            <Button variant="danger" onClick={handleDecline}>{declineText}</Button>
        )
    }



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Decision Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <NegativeButton />
                <AffirmativeButton />
            </Modal.Footer>
        </Modal>
    )
}