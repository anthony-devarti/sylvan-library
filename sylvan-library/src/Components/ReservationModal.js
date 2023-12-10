import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import SearchBar from './SubComponents/ReservationModal/SearchBar';
import Basket from './SubComponents/ReservationModal/Basket';

export default function ReservationModal({ show, handleClose }) {

    return (
        <Modal show={show} onHide={handleClose} size='xl' className='reservation-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Let's get you some cards!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className='reservation-modal-body'>
                        <Col>
                            <SearchBar />
                        </Col>
                        <Col className='basket' xs xl={3}>
                            <Basket />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Nevermind
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Submit Request
                </Button>
            </Modal.Footer>
        </Modal>
    )
}