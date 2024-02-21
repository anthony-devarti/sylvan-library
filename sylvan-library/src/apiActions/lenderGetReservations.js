import axios from 'axios';
import { baseURL } from '../AppConstants';
import { successToast, errorToast } from '../Components/SubComponents/Toastify';
import { setOpenReservations, setTableLoading } from '../features/lender/lenderSlice';

const lenderGetReservations = async (dispatch) => {
    dispatch(setTableLoading(true))
  try {
    const response = await axios.get(`${baseURL}reservation/lender_get_active_reservations/`);
    dispatch(setOpenReservations(response.data.reservations))
    dispatch(setTableLoading(false))
    successToast(response.data.message || 'Data fetched successfully');
    return response.data.reservations;
  } catch (error) {
    console.error('Error fetching data:', error);
    errorToast(error.response?.data?.error || 'Error fetching data');
    dispatch(setTableLoading(false))
    throw error; // Rethrow the error to be handled by the calling component
  }
};

export default lenderGetReservations;
