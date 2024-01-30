/* 
UserAuthModal Component is there to handle the user information all in one place.
It functions as a method of logging in, creating a new user, or viewing the information of the current user.
User functionality should be a very very small footprint, so dedicating as little real estate to it as possible is ideal.

props:
children | jsx | this prop determines what is shown in the body of the 

*/

import { Modal, Button } from 'react-bootstrap';

export default function UserAuthModal({show, handleClose, children, title}) {

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>

    )
}