import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import SearchBar from './SubComponents/ReservationModal/SearchBar';
import Basket from './SubComponents/ReservationModal/Basket';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addItem, removeItem, replaceBasket } from '../features/basket/basketSlice'
import AvailabilityCheck from '../utilities/AvailabilityCheck';
import addLineItem from '../apiActions/addLineItem';
import removeLineitem from '../apiActions/removeLineItem';
import { errorToast, successToast } from './SubComponents/Toastify';
import ReservationDetailsForm from './SubComponents/ReservationModal/ReservationDetailsForm';
import getBasketContents from '../apiActions/getBasketContents';
import submitReservation from '../apiActions/submitReservation';
import createReservation from '../apiActions/createReservation';

/**
 * ReservationModal Component
 * @param {Object} props - React component props
 * @param {boolean} props.show - Controls the visibility of the modal
 * @param {Function} props.handleClose - Callback function to close the modal
 */
export default function ReservationModal({ show, handleClose }) {

    const dispatch = useDispatch()

    // get important information from the redux store
    const currentReservation = useSelector(state => state.basket.openReservationID)
    const currentReservationUrl = useSelector(state => state.basket.openReservationUrl)
    const basket = useSelector(state => state.basket.contents)
    const userID = useSelector(state => state.user.userID)

    //each time the modal appears,get the associated lineitems for the currentReservation.
    useEffect(() => {
        getBasketContents(currentReservation)
    }, [show])

    /**
     * Clears the cart
     */
    function clearCart() {
        // TODO: Handle this in Redux
        console.log('clear the cart')
    }

    //the submit button
    const handleSubmit = () => {
        dispatch(submitReservation(currentReservationUrl, userID))
        getBasketContents()
        createReservation(userID)
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose} size='xl' className='reservation-modal' backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    <Row>
                        <Col>
                            Let's get you some cards!
                        </Col>
                    </Row>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className='reservation-modal-body'>
                        <Col xs xl={9}>
                            <SearchBar addToBasket={addLineItem} />
                        </Col>
                        <Col className='basket' xs xl={3}>
                            <Basket removeItemFromBasket={removeLineitem} />
                        </Col>
                    </Row>
                    <Row>
                        <Col><h1>Delivery Details</h1></Col>
                    </Row>
                    <Row>
                        <Col>
                            <ReservationDetailsForm />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                {basket.length &&
                    <Button variant="danger" onClick={clearCart}>
                        Clear Cart
                    </Button>
                }
                <Button variant="secondary" onClick={handleClose}>
                    Nevermind
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit Request
                </Button>
                {/* <AvailabilityCheck /> */}
            </Modal.Footer>
        </Modal>
    )
}