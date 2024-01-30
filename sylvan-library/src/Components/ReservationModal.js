import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import SearchBar from './SubComponents/ReservationModal/SearchBar';
import Basket from './SubComponents/ReservationModal/Basket';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addItem, removeItem, replaceBasket, } from '../features/basket/basketSlice'
import AvailabilityCheck from '../utilities/AvailabilityCheck';
import addLineItem from '../apiActions/addLineItem';
import removeLineitem from '../apiActions/removeLineItem';
import { errorToast, successToast } from './SubComponents/Toastify';
import ReservationDetailsForm from './SubComponents/ReservationModal/ReservationDetailsForm';

export default function ReservationModal({ show, handleClose }) {

    const dispatch = useDispatch()

    const basket = useSelector(state =>
        state.basket.contents
    )

    const currentReservation = useSelector(state =>
        state.basket.openReservation
    )

    useEffect(() => {
        //handle cart details from local storage.
        let storedBasket = localStorage.getItem('basket')
        if (!storedBasket) return undefined
        if (basket != storedBasket) {
            // console.log('there are stored items that are not currently visible in the basket')
            //replace basket with one from localstorage
            dispatch(
                replaceBasket(JSON.parse(storedBasket))
            )
        }
    }, [])

    function clearCart() {
        //todo: handle this in redux
        console.log('clear the cart')
    }

    //add something to the basket
    async function addToBasket(itemToAdd) {

        const onSuccess = () => {
            successToast(`${itemToAdd.name} has been succesfully reserved.  It will remain reserved until you remove it or you are logged out.`);
            // this will add the item to the cart
            // it is intentionally kept in the onSuccess function so it does not add the item to the cart if the addLineItem call fails  
            dispatch(
                addItem({
                    id: nanoid(),
                    ...itemToAdd,
                    url: itemUrl
                })
            )
        }
        //this will create a line item in the db and add the inventory id to the reserved cards list
        let itemUrl = await addLineItem(
            itemToAdd,
            currentReservation,
            onSuccess,
            () => errorToast(`Something went wrong and ${itemToAdd} was not reserved sucessfully.`))
        

        //handle the localstorage
        let newItem = { ...itemToAdd, url: itemUrl }
        //unsuprisingly, this is causing some duplicated items in the localstorage basket
        let newBasket = [...basket, newItem]
        localStorage.setItem('basket', JSON.stringify(newBasket))
    }

    function removeItemFromBasket(itemToRemove) {
        removeLineitem(
            itemToRemove,
            () => successToast(`${itemToRemove.name} has been released from your reservation.  It is now available for others to reserve.`),
            () => errorToast(`Something went wrong. ${itemToRemove.name} was not able to be released.`)
        )
        dispatch(
            removeItem({
                id: nanoid(),
                ...itemToRemove
            })
        )

        //handle the localstorage
        //get the basket from local storage and parse it
        let oldBasket = localStorage.getItem('basket')
        let editableBasket
        if (oldBasket) {
            editableBasket = JSON.parse(oldBasket)
        }
        //adjust the basket to remove the item in question
        let newBasket = editableBasket.filter((item) => item.inventory_id != itemToRemove.inventory_id)
        //set the local storage with a new basket with the item removed
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
                {/* VINCE/Issue-7:  We want to start here.  the onClick is the function that's called when a user clicks on this button.
                That means it all starts here.
                When this button is clicked, we want a few specific things to happen:
                First, we should be able to get the details of our open reservation from the basketSlice via useSelector(openReservation)
                Second, we want to create an api action in the api action directory to handle this specific api call, probably should call it putSubmitReservation
                Lastly, we want to switch over to the api so we can handle what specifically happens when this reservation is submitted.
                    That means the backend should progress the reservation to the next stage
                    then, I think it would make sense if the backend's 200 response included the cards that are being lent.
                After the button is clicked, the user should see a successToast('some message') if the response is good and an errorToast('some other message') if it's not.

                Tips:  
                -This is going to involve some async functions, so you should use the other apiActions to help you.
                -don't forget that if you want the onClick to take parameters, you want to use an arrow function so it doesn't get immediately called on render.
                -you will be messing around in python for this because you'll probably want to expose an endpoint for a custom method on the reservations endpoint. */}
                <Button variant="primary" onClick={handleClose}>
                    Submit Request
                </Button>
                <AvailabilityCheck />
            </Modal.Footer>
        </Modal>
    )
}