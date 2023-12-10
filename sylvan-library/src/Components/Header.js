import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="/img/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Sylvan Library
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}