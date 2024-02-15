import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Alert, Button } from 'react-bootstrap';
import openCase from '../../apiActions/openCase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProblemForm = ({ reservationID, lineItems }) => {
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
        lineItemProblems: lineItems.reduce((acc, lineItem) => {
            acc[lineItem.id] = 'nothingWrong';
            return acc;
        }, {}),
        note: '',
    };

    const handleSubmit = (values) => {
        // Handle form submission logic here
        console.log(values);
        openCase(values)
        //now we should redirect back to the reservations route.
        navigate('/reservations')
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
                <Form className='problem-form'>
                    <div>
                        <h1>Report Problem with Reservation #{reservationID}</h1>
                    </div>
                    <div className='checkbox-container'>
                        <label className='custom-checkbox-label'>
                            <Field type="checkbox" name="entireReservationUndelivered" className="custom-checkbox" />
                            <span className="custom-checkbox-icon"></span>
                            Entire reservation was not received
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
                                    >
                                        <option value="nothingWrong">Nothing is wrong with this item</option>
                                        <option value="itemMissing">Item is missing from reservation</option>
                                    </Field>
                                </label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label>
                            Note:
                            <Field
                                as="textarea"
                                name="note"
                                maxLength={200}
                            />
                            <ErrorMessage name="note" component="div" className="error" />
                        </label>
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
