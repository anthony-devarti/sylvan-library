import { Form, Button } from "react-bootstrap";

export default function CreateUserForm() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="inviteCode">
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="First Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="inviteCode">
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="The same as above" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inviteCode">
                <Form.Label>Invite Code</Form.Label>
                <Form.Control placeholder="Code to Join" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Agreement" />
                <Form.Text>
                    By selecting this and continuing this signup process, I agree that:
                    <ul>
                        <li>This Application is currently in Alpha, and that all features may not be working as expected</li>
                        <li>I have been explicitly invited to participate in this test and was handed an Invite code</li>
                        <li>I am personally responsible for cards that I am borrowing and am willing to compensate the lender for any cards not returned</li>
                        <li>I will attempt to use this service in good faith</li>
                        <li>I will follow the procedures outlined for borrowing and returning cards to the best of my ability, and will not request exeptions be made to these outlines except in extreme cases of application failure</li>
                    </ul>
                </Form.Text>
            </Form.Group>
            <div>
                <div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
                <div>
                    Already have an Account?  Sign in
                </div>
            </div>
        </Form>
    )
}