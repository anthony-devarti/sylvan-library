import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Alert, Button } from 'react-bootstrap';
import openCase from '../../apiActions/openCase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ProblemForm = ({ reservationID, lineItems, mode }) => {
    const userID = useSelector(state => state.user.userID)
    const navigate = useNavigate()

    if (!reservationID || !lineItems) {
        return (
            <Alert variant='danger'>Something went wrong. Perhaps you didn't get here the way you were supposed to?</Alert>
        )
    }

    const initialValues = {
        userID: userID,
        reservationID: reservationID,
        entireReservationUndelivered: false,
        lineItemProblems: {},
        note: '',  // Add a note field to the initial values
    };

    const handleSubmit = (values) => {
        // Handle form submission logic here
        // console.log(values);
        openCase(values)
        // Now we should redirect back to the reservations route.
        navigate('/reservations')
    };

    //handles the switching between form options
    let wholeReservation = {}
    let options = []
    switch (mode) {
        case 'delivery':
            wholeReservation = {
                value: 'entireReservationUndelivered',
                label: 'Entire Reservation Undelivered'
            }
            options = [
                <>
                    <option value="nothingWrong">Nothing is wrong with this item</option>
                    <option value="itemMissing">Item not in Reservation package</option>
                </>
            ]
            break;
        case 'lost':
            wholeReservation = {
                value: 'entireReservationLost',
                label: 'Entire Reservation Lost'
            }
            options = [
                <>
                    <option value="nothingWrong">Nothing is wrong with this item</option>
                    <option value="itemLost">This item was lost</option>
                    <option value="itemDamaged">This item was significantly damaged</option>
                </>
            ]
            break;
        default:
            break;
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
                <Form className='problem-form'>
                    <div>
                        <h1>Report Problem with Reservation #{reservationID}</h1>
                    </div>
                    <div className='checkbox-container'>
                        <label className='custom-checkbox-label'>
                            <Field type="checkbox" name={wholeReservation.value} className="custom-checkbox" />
                            <span className="custom-checkbox-icon"></span>
                            {wholeReservation.label}
                        </label>
                    </div>

                    <div className={`line-item-container ${values.entireReservationUndelivered ? 'disabled' : ''}`}>
                        <h3>{values.entireReservationUndelivered ? 'Individual Card Selection Unavailable' : 'Line Items:'}</h3>
                        {lineItems.map((lineItem) => (
                            <div key={lineItem.id} className='line-item'>
                                <label>
                                    {lineItem.name}:
                                    <Field
                                        as="select"
                                        name={`lineItemProblems.${lineItem.id}`}
                                        disabled={values.entireReservationUndelivered}
                                        value={values.lineItemProblems[lineItem.id]?.selectedValue || 'nothingWrong'}
                                        onChange={(e) => {
                                            const updatedLineItemProblems = {
                                                ...values.lineItemProblems,
                                                [lineItem.id]: { ...lineItem, selectedValue: e.target.value },
                                            };
                                            setFieldValue('lineItemProblems', updatedLineItemProblems);
                                        }}
                                    >
                                        {options}
                                    </Field>
                                </label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label>
                            Note:
                        </label>
                        <Field
                            as="textarea"
                            name="note"
                            maxLength={200}
                            className='form-note'
                        />
                        <ErrorMessage name="note" component="div" className="error" />
                    </div>

                    <div>
                        <Button type="submit" variant='danger' className='report-button'>Report Problem</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ProblemForm;
