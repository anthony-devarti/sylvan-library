import { Form, Button, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

export default function CreateUserForm() {

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <p>
                Your first and last name put in here must match the first and last name on your ID.
            </p>
            <p>
                This information is never made public to other users.
            </p>
            <p>
                Your preferred name is the only information that other users can see.
            </p>
            <p>
                There are no usernames here, so please ensure that the preferred name you input on this form is how you would like to be addressed when you meet a lender/borrower in public.
            </p>
        </Tooltip>
    );

    return (
        <Form>
            <Form.Group className="mb-3" controlId="identity">
                <Row>
                    <Col xl={6}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder="First Name" />
                        <Form.Text>Why am I being asked this</Form.Text>
                    </Col>
                    <Col xl={6}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="Last Name" />
                        <Form.Text>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                {/* <Button variant="outline-secondary" style={{borderRadius:'20pt', paddingLeft:'1rem', paddingRight: '1rem'}}>?</Button> */}
                                <FontAwesomeIcon icon={faCircleQuestion} />
                            </OverlayTrigger>
                        </Form.Text>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="identity2">
                <Row>
                    <Col xl={6}>
                        <Form.Label>Preferred Name</Form.Label>
                        <Form.Control placeholder="Preferred Name" />
                        <Form.Text>The name you use going about your life.  This is not a Username</Form.Text>
                    </Col>
                    <Col cl={6}>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Col>
                </Row>
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
                        <li>I am the person I claim to be, and am able/willing to provide identity verification when requested</li>
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