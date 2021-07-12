import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';


const CreatePonenciaModal = (props) => {
    const [titleData, setTitleData] = useState("");
    const [reunionNameData, setReunionNameData] = useState("");
    const [dateData, setDateData] = useState(new Date());
    
    const handleTitleChange = (event) => setTitleData(event.target.value);
    const handleReunionNameChange = (event) => setReunionNameData(event.target.value);
    const handleDateChange = (event) => setDateData(event.target.value);
    const handleSubmit = () => {
        const data = {
            title: titleData,
            reunionName: reunionNameData,
            dateData: dateData,
            idPersona: 10000,
        };
        let url = `http://localhost:8000/ponencia`
        console.log(data);
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }).then(response => response.json()).then(json_data => {console.log(json_data); props.handleClose();})
        
    };
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Ponencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="ponenciaTitle">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese un titulo" onChange={handleTitleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="estadoPonencia">
                            <Form.Label>Nombre de la reunion</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el nombre de la reunion" onChange={handleReunionNameChange}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="Fecha Ponencia">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date" onChange={handleDateChange}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

const CreatePonenciaSection = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>Crear Ponencia</Button>
            <CreatePonenciaModal show={show} handleClose={handleClose} />
        </>
    );
};

export default CreatePonenciaSection;