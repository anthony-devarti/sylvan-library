import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import UserAuthModal from "./User";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import UserInfo from "./UserInfo";
import { loginUser } from "../../features/user/userSlice";
/*
The user widget is the component that handles all of the user-related actions for the app, such as:
login
user creation
user history
user editing


Let's try to keep everything that affects the user in here
*/

export const UserWidget = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.userID)

    //handle the modal to show user info (only available if signed in)
    const [showUserModal, setShowUserModal] = useState(false)
    const handleOpenUserModal = () => setShowUserModal(true)
    const handleCloseUserModal = () => setShowUserModal(false)


    //handle the modal to login or create a user (only available if logged out)
    const [showLoginUserModal, setShowLoginUserModal] = useState(false)
    const handleOpenLoginUserModal = () => setShowLoginUserModal(true)
    const handleCloseLoginUserModal = () => setShowLoginUserModal(false)

    useEffect(() => {
        let userInLocalStorage = JSON.parse(localStorage.getItem('user'))
        //if the user is not in state, but it is in localstorage
        if (!user && userInLocalStorage){
            //dispatch the user in localStorage to state
            dispatch(loginUser(userInLocalStorage))
        }

    }, [user])

    return (
        <div className='user-actions'>
            <div className="user-button" onClick={user ? handleOpenUserModal : handleOpenLoginUserModal}>
                <FontAwesomeIcon icon={faCircleUser} size='3x' color='white' />
            </div>
            {/* The login user auth modal  */}
            <UserAuthModal show={showLoginUserModal} handleClose={handleCloseLoginUserModal} title={'Login'}>
                <LoginForm />
            </UserAuthModal>
            {/* the details user modal, also for logging out  */}
            <UserAuthModal show={showUserModal} handleClose={handleCloseUserModal} title={'User Information'}>
                <UserInfo />
            </UserAuthModal>
        </div>
    )
}

export default UserWidget;