import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

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
                <NavDropdown title="Afiliaciones" id="afiliaciones-dropdown">
                    <NavDropdown.Item href="/afiliacion_previsional">Previsional</NavDropdown.Item>
                    <NavDropdown.Item href="/afiliacion_salud">Salud</NavDropdown.Item>
                    <NavDropdown.Item href="/afiliacion_bancaria">Bancaria</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/ponencias">Ponencias</Nav.Link>
            </Nav>
            <Navbar.Toggle />
        </Navbar>
        </>
    )
}

export default Navigation;