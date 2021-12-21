import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const NavBarMenu = () => {
    return (
        <>
            <Navbar bg="vino" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to="/home">
                        <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/home">
                                <Nav.Link >Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/registro">
                                <Nav.Link>Registro</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/contacto">
                                <Nav.Link>Contacto</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/mision">
                                <Nav.Link>Misiones</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
