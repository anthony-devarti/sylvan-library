import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import SearchBar from './SubComponents/ReservationModal/SearchBar';
import Basket from './SubComponents/ReservationModal/Basket';
import { useState } from 'react'

export default function ReservationModal({ show, handleClose }) {

    //VINCE: this piece of state is kept way up 
    const [ basket, setBasket ] = useState([])

    //add something to the basket
    function addToBasket(itemToAdd){
        setBasket(
            [
                ...basket,
                itemToAdd
            ]
        )
    }

    function clearCart(){
        setBasket([])
    }

    function removeItemFromBasket(itemToRemove){
        setBasket(basket.filter((item) => item != itemToRemove))
    }

    return (
        <Modal show={show} onHide={handleClose} size='xl' className='reservation-modal' backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Let's get you some cards!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className='reservation-modal-body'>
                        <Col xs xl={9}>
                            <SearchBar addToBasket={addToBasket}/>
                        </Col>
                        <Col className='basket' xs xl={3}>
                            <Basket contents={basket}  removeItemFromBasket={removeItemFromBasket}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                {basket.length > 0 &&
                <Button variant="danger" onClick={clearCart}>
                    Clear Cart
                </Button>
                }
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