import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import SearchBar from './SubComponents/ReservationModal/SearchBar';
import Basket from './SubComponents/ReservationModal/Basket';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addItem, removeItem } from '../features/basket/basketSlice'

export default function ReservationModal({ show, handleClose }) {

    const dispatch = useDispatch()

    //VINCE: this piece of state is kept way up 
    //replacing this with redux for sanity's sake

    //add something to the basket
    function addToBasket(itemToAdd) {
        dispatch(
            addItem({
                id: nanoid(),
                ...itemToAdd
            })
        )
    }

    const expirationTime = useSelector( state =>
        state.basket.expirationTime
        )

    const basket = useSelector( state =>
        state.basket.contents
        )

    function clearCart() {
        console.log('clear the cart')
    }

    function removeItemFromBasket(itemToRemove) {

        dispatch(
            removeItem({
                id: nanoid(),
                ...itemToRemove
            })
        )
    }

    return (
        <Modal show={show} onHide={handleClose} size='xl' className='reservation-modal' backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    <Row>
                        <Col>
                            Let's get you some cards!
                        </Col>
                        {/* <Col>
                            Cart Expires in/at {expirationTime}
                        </Col> */}
                    </Row>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className='reservation-modal-body'>
                        <Col xs xl={9}>
                            <SearchBar addToBasket={addToBasket} />
                        </Col>
                        <Col className='basket' xs xl={3}>
                            <Basket contents={basket} removeItemFromBasket={removeItemFromBasket} />
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