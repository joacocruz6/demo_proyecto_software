import React, {useState} from 'react';
import {Form, FormControl, Button, Container, Row, Col, InputGroup, Alert, Spinner} from 'react-bootstrap';
import Results from '../results/Results.jsx';


const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const searchBarChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const [resultsData, setResultsData] = useState([]);

    const searchButtonClickEvent = (page_number, page_size) => () => {
        if (searchQuery===""){
            setError("You must filter by an attribute");
            return;
        }
        // let x = "{\n  getRowsPonencia(filter: {id_ponencia: 1}, pagination: {pageNumber: 1, pageSize: 5}) {\n    ponencia {\n      id_ponencia\n      ambito {\n        id_ambito\n        nombre_ambito\n      }\n      tipo_reunion {\n        id_tipo_reunion\n        nombre_tip_reu\n      }\n      estado_verificacion_uchile {\n        id_estado_verif\n        nombre_est_verif_uchile\n      }\n      estado_ponencia {\n        id_estado_ponencia\n        nombre_est_ponencia\n      }\n    }\n  }\n}\n";
        let gqlQuery = `{\n  getRowsPonencia(filter: {${searchQuery}}, pagination: {pageNumber: ${page_number}, pageSize: ${page_size}}) {\n    total_rows\n    ponencia {\n      id_ponencia\n      ambito {\n        id_ambito\n        nombre_ambito\n      }\n      tipo_reunion {\n        id_tipo_reunion\n        nombre_tip_reu\n      }\n      estado_verificacion_uchile {\n        id_estado_verif\n        nombre_est_verif_uchile\n      }\n      estado_ponencia {\n        id_estado_ponencia\n        nombre_est_ponencia\n      }\n    }\n  }\n}\n`;
        let queryBody = {
            operationName: null,
            variables: {},
            query: gqlQuery,
        };
        console.log(queryBody);
        let url = "https://openfaas-desa.uchile.cl/function/ponencia-go/query";
        let origin = "https://openfaas-desa.uchile.cl"
        origin = "http://localhost:8080"
        url = "http://localhost:8080/query"
        setSpinner(true);
        fetch(url, { 
            method: "POST",
            cache: "no-cache",
            headers: {
                "Accept-Encoding": "gzip, deflate, br",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "DNT": "1",
                "Origin": origin,
            },
            keepalive: true,
            body: JSON.stringify(queryBody),
        }).then(data => data.json()).then(data => {
            console.log(data["data"]);
            setResultsData(data["data"]["getRowsPonencia"]["ponencia"]);
            setTotalPages((parseInt(data["data"]["getRowsPonencia"]["total_rows"])/resultsPerPage)+1);
            setSpinner(false);
        }).catch((reason) => setSpinner(false));

        setError("");
    };
    const setNextPageClickEvent = searchButtonClickEvent;
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
    const spinnerWidget = spinner ? <Spinner animation="border" size="sm" role="status"><span className="sr-only">Loading...</span></Spinner> : "";
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
                                <Button onClick={searchButtonClickEvent(pageNumber, resultsPerPage)} variant="outline-secondary">{spinnerWidget}Buscar</Button>
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
        <Results results_data={resultsData} page_event={setNextPageClickEvent} total_pages={totalPages} page_number={pageNumber} set_page_number={setPageNumber} results_per_page={resultsPerPage}/>
        </>
    );
}

export default SearchBar;