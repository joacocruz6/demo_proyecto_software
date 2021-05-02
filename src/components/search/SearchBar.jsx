import React, {useState} from 'react';
import {Form, FormControl, Button, Container, Row, Col, InputGroup} from 'react-bootstrap';
import Results from '../results/Results.jsx';
const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const searchBarChange = (event) => {
        setSearchQuery(event.target.value);
    }
    return (
        <>
        <Container fluid="md"> 
            <Row style={{marginTop: "10vh"}}>
                <Col></Col>
                <Col xs={7}>
                    <Form>
                        <InputGroup className="mb-3">
                            <FormControl onChange={searchBarChange} value={searchQuery} type="text" placeholder="Buscar Ponencia" />
                            <InputGroup.Append>
                                <Button variant="outline-secondary">Buscar</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
        <Results />
        </>
    );
}

export default SearchBar;