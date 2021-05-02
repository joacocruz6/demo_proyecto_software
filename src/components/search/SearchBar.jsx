import React, {useState} from 'react';
import {Form, FormControl, Button, Container, Row, Col, InputGroup, Alert} from 'react-bootstrap';
import Results from '../results/Results.jsx';






const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const searchBarChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const searchButtonClickEvent = () => {
        if (searchQuery===""){
            setError("You must filter by an attribute");
            return;
        }
        setError("");
    };

    const ErrorDismissible = (props) => {
        const [show, setShow] = useState(true);
      
        if (show) {
          return (
            <Alert variant="danger" onClose={() => {setShow(false); setError("")}} dismissible>
              <p>
                {props.message}
              </p>
            </Alert>
          );
        }
        return <></>;
      };

    const errorWidget = error === "" ? "" : <ErrorDismissible message={error} />;
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
                                <Button onClick={searchButtonClickEvent} variant="outline-secondary">Buscar</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
            <Row style={{marginTop: "3vh"}}>
                <Col></Col>
                <Col xs={7}>
                    {errorWidget}
                </Col>
                <Col></Col>
            </Row>
        </Container>
        <Results />
        </>
    );
}

export default SearchBar;