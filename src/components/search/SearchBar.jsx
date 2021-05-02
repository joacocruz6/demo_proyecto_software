import React from 'react';
import {Form, FormControl, Button, Container, Row, Col, InputGroup} from 'react-bootstrap';
const SearchBar = () => {
    return (
        <>
        <Container fluid="md"> 
            <Row style={{marginTop: "10vh"}}>
                <Col></Col>
                <Col xs={7}>
                    <Form>
                        <InputGroup className="mb-3">
                            <FormControl type="text" placeholder="Buscar Ponencia" />
                            <InputGroup.Append>
                                <Button variant="outline-secondary">Buscar</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container> 
        </>
    );
}

export default SearchBar;