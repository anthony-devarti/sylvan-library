import { Col, Row, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getCurrentDateTime } from '../../../utilities/dateTimeFormatter';

/**
 * ReservationDetailsForm Component
 * @param {Object} props - React component props
 * @param {Object} props.formik - Formik instance for form state management
 */
const ReservationDetailsForm = ({ formik }) => {
    return (
        <form onSubmit={formik.handleSubmit} className="reservation-form">
            <Container>
                <Row>
                    {/* Left column */}
                    <Col xs={6}>
                        {/* Pickup Method dropdown */}
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip id="button-tooltip" >
                                    Choose how you are going to collect your reservation.  If you choose other, all necessary information must be included in the Note section.
                                </Tooltip>
                            }
                        >
                            <div className="form-group">
                                <label htmlFor="pickupMethod">Pickup Method:</label>
                                <select
                                    id="pickupMethod"
                                    name="pickupMethod"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pickupMethod}
                                >
                                    <option value="from-lenders-home">From Lender's Home</option>
                                    <option value="at-specific-event">At Specific Event</option>
                                    <option value="other">Other</option>
                                </select>
                                {formik.touched.pickupMethod && formik.errors.pickupMethod ? (
                                    <div className="error-message">{formik.errors.pickupMethod}</div>
                                ) : null}
                            </div>
                        </OverlayTrigger>

                        {/* Note textarea */}
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip id="button-tooltip" >
                                    This is your only chance to add notes to this reservation.  Be sure to include everything you need to in order to be able to collect and return your reservation.  If the lender is meeting you somewhere, it should be noted in here.
                                </Tooltip>
                            }
                        >
                            <div className="form-group">
                                <label htmlFor="note">Note:</label>
                                <textarea
                                    id="note"
                                    name="note"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.note}
                                    placeholder='Include information about the pickup. If you are picking up at an event, mention the event.'
                                />
                                {formik.touched.note && formik.errors.note ? (
                                    <div className="error-message">{formik.errors.note}</div>
                                ) : null}
                            </div>
                        </OverlayTrigger>
                    </Col>

                    {/* Right column */}
                    <Col xs={6}>
                        {/* Pickup Date and Time input - Enabled only for "From Lender's Home" */}
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip id="button-tooltip" >
                                    If you are not picking up at an event, you should select a pickup date and time.  Failure to meet this time may result in your reservation being cancelled.
                                </Tooltip>
                            }
                        >
                            <div className="form-group">
                                <label htmlFor="pickupDateTime">Pickup Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    id="pickupDateTime"
                                    name="pickupDateTime"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pickupDateTime}
                                    disabled={formik.values.pickupMethod !== 'from-lenders-home'}
                                    min={getCurrentDateTime()}
                                />
                                {formik.touched.pickupDateTime && formik.errors.pickupDateTime ? (
                                    <div className="error-message">{formik.errors.pickupDateTime}</div>
                                ) : null}
                            </div>
                        </OverlayTrigger>

                        {/* Return Date input */}
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip id="button-tooltip" >
                                    Pick the return time.  Keep in mind that reservations that are returned more than a week after pickup are more likely to be declined, especially for new borrowers.  This time is binding, so please pick a date and time carefully.  It is your responsibility to return your reservation by this time.  Failure to do so may result in your suspension from the program.
                                </Tooltip>
                            }
                        >
                            <div className="form-group">
                                <label htmlFor="returnDate">Return Date:</label>
                                <input
                                    type="datetime-local"
                                    id="returnDate"
                                    name="returnDate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.returnDate}
                                    min={getCurrentDateTime()}
                                />
                                {formik.touched.returnDate && formik.errors.returnDate ? (
                                    <div className="error-message">{formik.errors.returnDate}</div>
                                ) : null}
                            </div>
                        </OverlayTrigger>
                    </Col>
                </Row>
            </Container>
        </form>
    );
}

export default ReservationDetailsForm;