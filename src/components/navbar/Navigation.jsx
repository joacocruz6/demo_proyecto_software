import React from 'react';
import {Navbar} from 'react-bootstrap'

const Navigation = (props) => {
    return (
        <>
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">
                Estado Ponencias
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end text-white">
                Hola {props.name}
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}

export default Navigation;