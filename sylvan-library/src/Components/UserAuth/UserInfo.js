/* 
User info is just a place where a user can see some stuff about their user account.

*/

import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { errorToast, successToast } from '../SubComponents/Toastify';
import { logoutUser } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';

const UserInfo = ({closeModal}) => {

    const dispatch = useDispatch()

    let userStats = [
        {
            title: 'Reservations Open:',
            value: '1'
        },
        {
            title: 'Reservations Completed:',
            value: '14'
        },
        {
            title: 'Reservations Lost (any #):',
            value: '0'
        },
        {
            title: 'Delinquencies:',
            value: '0'
        },
        {
            title: 'Total Value borrowed:',
            value: '$78'
        },
        {
            title: 'Joined',
            value: '1/24/24'
        },
        {
            title: 'Name',
            value: 'Breanna'
        },
        {
            title: 'Email',
            value: 'stewie@hotmail.com'
        },

    ]

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSRFToken': csrfToken, // Make sure to include the CSRF token
                },
            });
    
            if (response.ok) {
                // Successful logout
                // Perform any additional client-side cleanup or navigation
    
                // Assuming you have a Redux action to clear user data
                dispatch(logoutUser());
    
                // Assuming you have a function to clear local storage or perform other cleanup
                // clearLocalStorage();
                localStorage.setItem('user', JSON.stringify(null))
                localStorage.setItem('csrfToken', JSON.stringify(null))
    
                //show a toast letting them know they're logged out
                successToast('You are logged out.  The contents of your basket have been cleared.')

                //actually clear their basket now.

                //close the modal
                closeModal()
            } else {
                // Handle error response
                const errorData = await response.json();
                console.error('Error during logout:', errorData);
                // Handle error on the client side (display an error message, etc.)
            }
        } catch (error) {
            console.error('Error during logout:', error);
            errorToast("Failed to log you out.  Guess you're stuck here forever.")
            // Handle other potential errors (e.g., network issues)
        }
    };
    
    return (
        <div className='user-info'>
            {userStats.map((statLine) => {
                return (
                    <Row key={statLine.title}>
                        <Col>
                            {statLine.title}
                        </Col>
                        <Col>
                            {statLine.value}
                        </Col>
                    </Row>
                )
            })}
            <div className='user-info-actions'>
                <Button variant='danger' onClick={handleLogout}>
                    Logout <FontAwesomeIcon icon={faRightFromBracket} />
                </Button>
            </div>
        </div>
    )
}

export default UserInfo