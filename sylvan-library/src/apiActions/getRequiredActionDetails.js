/**
 * Fetches details for a required action from the backend.
 *
 * @param {number} requiredActionId - The unique identifier of the required action.
 * @returns {Promise<Object>} A Promise that resolves to an object containing details of the required action.
 * @throws Will throw an error if the API call fails or if the required action with the given ID is not found.
 * @example
 * // Example usage
 * const requiredActionId = 'abc123'; // Replace with the actual required action ID
 * const actionDetails = await getRequiredActionDetails(requiredActionId);
 * console.log(actionDetails); // Log the details of the required action
 */
import axios from 'axios';

const getRequiredActionDetails = async (requiredActionId) => {
    try {
        const response = await axios.get(`/decisionpoint/${requiredActionId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching required action details with ID ${requiredActionId}:`, error);
        throw error;
    }
}

export default getRequiredActionDetails;
