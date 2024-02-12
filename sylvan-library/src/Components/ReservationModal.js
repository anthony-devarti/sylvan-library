import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import SearchBar from './SubComponents/ReservationModal/SearchBar';
import Basket from './SubComponents/ReservationModal/Basket';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import addLineItem from '../apiActions/addLineItem';
import removeLineitem from '../apiActions/removeLineItem';
import ReservationDetailsForm from './SubComponents/ReservationModal/ReservationDetailsForm';
import getBasketContents from '../apiActions/getBasketContents';
import submitReservation from '../apiActions/submitReservation';
import createReservation from '../apiActions/createReservation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { replaceBasket } from '../features/basket/basketSlice';
import getSubmittedReservations from '../apiActions/getAllReservations';
import clearBasket from '../apiActions/clearBasket';

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
        dispatch(clearBasket(currentReservation))
    }

    //Formik for the form submission functionality
    const formik = useFormik({
        initialValues: {
            note: '',
            pickupMethod: 'from-lenders-home',
            returnDate: '',
            pickupDateTime: '',
        },
        validationSchema: Yup.object({
            note: Yup.string().required('Note is required'),
            pickupMethod: Yup.string().required('Pickup Method is required'),
            returnDate: Yup.string().required('Return Date is required').test('dateComparison', 'Return Date must be later than Pickup Date', function (value) {
                const { pickupDateTime } = this.parent;
                return (pickupDateTime && value) ? new Date(value) > new Date(pickupDateTime) : true;
            }),
            pickupDateTime: Yup.string().test('requiredWhen', 'Pickup Date and Time are required', function (value) {
                const { pickupMethod } = this.parent;
                return (pickupMethod === 'from-lenders-home' || pickupMethod === 'other') ? !!value : true;
            }),
        }),
        onSubmit: (values) => {
            try {
                const { note, pickupMethod, returnDate, pickupDateTime } = values;

                const reservationData = {
                    note,
                    pickup_method: pickupMethod, // Map to the backend field name
                    return_date: returnDate, // Map to the backend field name
                    pickup_date: pickupDateTime, // Map to the backend field name
                    // Add other fields as needed
                };

                dispatch(submitReservation(currentReservationUrl, userID, reservationData))
                    .then(submitResult => {
                        if (submitResult.success) {
                            // Dispatch additional actions after successful submission
                            dispatch(createReservation(userID));
                            // We do not want any lingering items in the basket from previous reservations
                            dispatch(replaceBasket([]))
                            //we should get the reservations so we see the correct view without refreshing
                            handleClose(); // Close the modal
                        } else {
                            // Handle the case where submission was not successful (show error message, etc.)
                            console.error('Submission failed:', submitResult.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error during form submission:', error);
                    });
            } catch (error) {
                console.error('Error during form submission:', error);
            }
        },
    });

    //handles the warning message
    const [pickupDateWarning, setPickupDateWarning] = useState(false);

    useEffect(() => {
        const pickupDateTime = new Date(formik.values.pickupDateTime);
        const now = new Date();
        const timeDifference = pickupDateTime.getTime() - now.getTime();
        const hoursDifference = timeDifference / (1000 * 3600);

        if (hoursDifference <= 48) {
            setPickupDateWarning(true);
        } else {
            setPickupDateWarning(false);
        }
    }, [formik.values.pickupDateTime]);

    return (
        <Modal show={show} onHide={handleClose} size="xl" className="reservation-modal" backdrop="static">
            <Modal.Header>
                <Modal.Title>
                    <Row>
                        <Col>
                            {!pickupDateWarning &&
                                "Let's get you some cards!"
                            }
                            {pickupDateWarning && (
                                <div className="warning-message">
                                    Warning: Pickup date is within 48 hours.  Last-minute reservations are very likely to be declined.
                                </div>
                            )}
                        </Col>
                    </Row>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    {/* Top Half */}
                    <Row className="reservation-modal-body">
                        <Col xs xl={9}>
                            <SearchBar addToBasket={addLineItem} />
                        </Col>
                        <Col className="basket" xs xl={3}>
                            <Basket removeItemFromBasket={removeLineitem} />
                        </Col>
                    </Row>

                    {/* Bottom Half */}
                    <Row className="reservation-modal-delivery-form">
                        <Col>
                            <ReservationDetailsForm formik={formik} />
                        </Col>
                    </Row>
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
                <Button variant="primary" onClick={formik.handleSubmit}>
                    Submit Request
                </Button>
            </Modal.Footer>
        </Modal>
    );
}