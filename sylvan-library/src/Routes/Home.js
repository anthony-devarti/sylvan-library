//The home route.  This app is very simple, so this is mostly what the average user will see.
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import ReservationModal from '../Components/ReservationModal'

export default function Home() {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div className='home'>
            <div className='hero-text'>Sylvan Library</div>
            <Button onClick={() => handleShow()}>Reserve Cards</Button>
            <ReservationModal show={show} handleClose = {handleClose}/>
        </div>
    )
}