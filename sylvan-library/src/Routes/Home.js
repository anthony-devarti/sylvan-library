//The home route.  This app is very simple, so this is mostly what the average user will see.
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import ReservationModal from '../Components/ReservationModal'
import CreateUserForm from '../Components/UserAuth/CreateUserForm'
import LoginForm from '../Components/UserAuth/LoginForm'
import { ECHO_TOKEN } from '../AppConstants'
import get from '../apiActions/get'
import getReservedCardsList from '../apiActions/getReservedCardsList'

export default function Home() {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showForm, setShowForm] = useState(false)
    const handleShowForm = () => setShowForm(true)
    const handleCloseForm = () => setShowForm(false)

    const request = async () => {
        const endpoint = `http://127.0.0.1:8000/lineitem/`;
        const res = await fetch(endpoint)
        const data = await res.json();
        //we probably want to filter these search results according to outstanding inventory ids that are not available, that way we're not showing stuff that isn't available
        //this process will actively require us to have the backend running and hooked up correctly.
        // if (data.status != 'error') {
        //     setSearchResults(data.items)
        // }
        return data;
    } 

    return (
        <div className='home'>
            <div className='hero-text'>Sylvan Library</div>
            <Button onClick={() => handleShow()}>Reserve Cards</Button>
            <ReservationModal show={show} handleClose={handleClose} />
            {/* <Modal show={showForm} handleClose={handleCloseForm} size='lg'>
                <Modal.Header>
                    Authentication
                </Modal.Header>
                <Modal.Body>
                    <CreateUserForm />
                </Modal.Body>
            </Modal> */}
        </div>
    )
}
