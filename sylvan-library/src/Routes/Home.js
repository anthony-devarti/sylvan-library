//The home route.  This app is very simple, so this is mostly what the average user will see.
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import ReservationModal from '../Components/ReservationModal'
import CreateUserForm from '../Components/UserAuth/CreateUserForm'
import LoginForm from '../Components/UserAuth/LoginForm'

export default function Home() {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showForm, setShowForm] = useState(false)
    const handleShowForm = () => setShowForm(true)
    const handleCloseForm = () => setShowForm(false)

    return (
        <div className='home'>
            <div className='hero-text'>Sylvan Library</div>
            <Button onClick={() => handleShow()}>Reserve Cards</Button>
            <ReservationModal show={show} handleClose={handleClose} />
            <Button onClick={handleShowForm}>Test</Button>
            <Modal show={showForm} handleClose={handleCloseForm}>
                <Modal.Header>
                    Authentication
                </Modal.Header>
                <Modal.Body>
                    <LoginForm />
                </Modal.Body>
            </Modal>
        </div>
    )
}