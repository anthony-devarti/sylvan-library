import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { errorToast, successToast } from "../SubComponents/Toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/userSlice";

export default function LoginForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [csrfToken, setcsrfToken] = useState()

    const dispatch = useDispatch()

    const userID = useSelector(state =>
        state.user.userID)

    document.addEventListener('DOMContentLoaded', function () {
        const csrfTokenElement = document.getElementsByName('csrfmiddlewaretoken')[0];
        const token = csrfTokenElement ? csrfTokenElement.value : null;

        // Use csrfToken as needed in your fetch requests or other logic
        setcsrfToken(token)
        console.log('CSRF Token:', token);
    });

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            // Handle the response, e.g., check for success or error
            const data = await response.json();
            console.log(data);
            successToast('Succesfully Logged In!')
            //now we need to handle some redux stuff
            if (data.user) {
                dispatch(loginUser(data.user))
                //pop that userID in localStorage
                localStorage.setItem('user', JSON.stringify(data.user))
            }
        } catch (error) {
            console.error('Error during login:', error);
            errorToast('Something went wrong logging you in.')
        }
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <div>
                <div>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => handleLogin(e)}>
                        Login <FontAwesomeIcon icon={faRightToBracket} />
                    </Button>
                </div>
                <div>
                    Don't have an account yet?  Create One!  (invite only)
                </div>
            </div>
        </Form>
    )
}