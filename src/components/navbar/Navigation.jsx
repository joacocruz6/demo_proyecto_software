import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'

const Navigation = (props) => {
    return (
        <>
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">
                Tu Uchile
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/cotizaciones">Cotizaciones</Nav.Link>
                <Nav.Link href="/afiliacion">Afiliacion Bancaria</Nav.Link>
            </Nav>
            <Navbar.Toggle />
        </Navbar>
        </>
    )
}

export default Navigation;