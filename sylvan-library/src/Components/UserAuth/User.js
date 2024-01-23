/* 
UserAuthModal Component is there to handle the user information all in one place.
It functions as a method of logging in, creating a new user, or viewing the information of the current user.
User functionality should be a very very small footprint, so dedicating as little real estate to it as possible is ideal.

props:

*/

import { Modal } from 'react-bootstrap';

export default function UserAuthModal() {
    let userLoggedIn = true //dummy data, delete this line
    
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                I will not close if you click outside me. Do not even try to press
                escape key.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>

    )
}