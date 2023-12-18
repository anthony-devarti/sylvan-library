import { Form, Button } from "react-bootstrap";

export default function LoginForm() {
    return (
        <Form>
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
            <div>
                <div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
                <div>
                    Don't have an account yet?  Create One!  (invite only)
                </div>
            </div>
        </Form>
    )
}