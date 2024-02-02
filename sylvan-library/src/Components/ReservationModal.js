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
import submitReservation from '../apiActions/submitReservation';

/**
 * ReservationModal Component
 * @param {Object} props - React component props
 * @param {boolean} props.show - Controls the visibility of the modal
 * @param {Function} props.handleClose - Callback function to close the modal
 */
export default function ReservationModal({ show, handleClose }) {

    const dispatch = useDispatch()

    // Get the basket contents from Redux store
    const basket = useSelector(state => state.basket.contents)

    // Get the current reservation details from Redux store
    const currentReservation = useSelector(state => state.basket.openReservation)

    useEffect(() => {
        // Handle cart details from local storage.
        let storedBasket = localStorage.getItem('basket')
        if (!storedBasket) return undefined
        if (JSON.stringify(basket) !== storedBasket) {
            // Replace basket with one from local storage
            dispatch(replaceBasket(JSON.parse(storedBasket)))
        }
    }, [])

    /**
     * Clears the cart
     */
    function clearCart() {
        // TODO: Handle this in Redux
        console.log('clear the cart')
    }

    /**
     * Adds an item to the basket
     * @param {Object} itemToAdd - The item to add to the basket
     */
    async function addToBasket(itemToAdd) {
        // Create a line item in the db and add the inventory id to the reserved cards list
        let itemUrl = await addLineItem(itemToAdd, currentReservation)

        if (itemUrl && typeof itemUrl === 'string') {
            // Dispatch an action to add the item to the Redux store
            dispatch(addItem({
                id: nanoid(),
                ...itemToAdd,
                url: itemUrl
            }))
        }

        // Handle local storage
        let newItem = { ...itemToAdd, url: itemUrl }
        let newBasket = [...basket, newItem]
        localStorage.setItem('basket', JSON.stringify(newBasket))
    }

    /**
     * Removes an item from the basket
     * @param {Object} itemToRemove - The item to remove from the basket
     */
    function removeItemFromBasket(itemToRemove) {
        removeLineitem(
            itemToRemove,
            () => successToast(`${itemToRemove.name} has been released from your reservation. It is now available for others to reserve.`),
            () => errorToast(`Something went wrong. ${itemToRemove.name} was not able to be released.`)
        )

        // Dispatch an action to remove the item from the Redux store
        dispatch(removeItem({
            id: nanoid(),
            ...itemToRemove
        }))

        // Handle local storage
        let oldBasket = localStorage.getItem('basket')
        let editableBasket
        if (oldBasket) {
            editableBasket = JSON.parse(oldBasket)
        }

        // Adjust the basket to remove the item in question
        let newBasket = editableBasket.filter((item) => item.inventory_id !== itemToRemove.inventory_id)

        // Set the local storage with a new basket with the item removed
        localStorage.setItem('basket', JSON.stringify(newBasket))
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
                            <SearchBar addToBasket={addToBasket} />
                        </Col>
                        <Col className='basket' xs xl={3}>
                            <Basket contents={basket} removeItemFromBasket={removeItemFromBasket} />
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
                <Button variant="primary" onClick={() => submitReservation(currentReservation)}>
                    Submit Request
                </Button>
                <AvailabilityCheck />
            </Modal.Footer>
        </Modal>
    )
}