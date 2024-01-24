import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ReservationDetailsForm({ onSubmit }) {
    const formik = useFormik({
        initialValues: {
            note: '',
            pickupMethod: 'from-lenders-home',
            returnDate: '',
        },
        validationSchema: Yup.object({
            note: Yup.string().required('Note is required'),
            pickupMethod: Yup.string().required('Pickup Method is required'),
            returnDate: Yup.string().required('Return Date is required'),
        }),
        onSubmit: (values) => {
            // You can handle the form submission here
            console.log('Form Data:', values);
            // Perform additional actions, e.g., API calls, dispatching actions, etc.
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="reservation-form">
            <div className='left-form'>
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

                <div className="form-group">
                    <label htmlFor="returnDate">Return Date:</label>
                    <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.returnDate}
                    />
                    {formik.touched.returnDate && formik.errors.returnDate ? (
                        <div className="error-message">{formik.errors.returnDate}</div>
                    ) : null}
                </div>
            </div>
            <div className='right-form'>
                <div className="form-group">
                    <label htmlFor="note">Note:</label>
                    <textarea
                        id="note"
                        name="note"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.note}
                    />
                    {formik.touched.note && formik.errors.note ? (
                        <div className="error-message">{formik.errors.note}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <button type="submit" className="submit-button">
                        Save
                    </button>
                </div>
            </div >
        </form>
    );
}