import React, {useState} from 'react';
import {Pagination, Container, Row, Col, Table} from 'react-bootstrap';

const Paginator = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const nextPage = () => {
        setPageNumber(pageNumber+1);
    }
    const previousPage = () => {
        if(pageNumber === 0) return;
        setPageNumber(pageNumber-1);
    }
    const previous = pageNumber===1 ? <Pagination.Item key={"Anterior"} disabled>{"Anterior"}</Pagination.Item>:<Pagination.Item onClick={previousPage} key={"Anterior"}>{"Anterior"}</Pagination.Item>;
    return (
        <>
        <Pagination>
            {previous}
            <Pagination.Item key={pageNumber} disabled>{pageNumber}</Pagination.Item>
            <Pagination.Item  onClick={nextPage} key={"Siguiente"}>{"Siguiente"}</Pagination.Item>
        </Pagination>
        </>
    );
};

const ResultTable = (props) => {
    return (
        <>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>ID</th>
                <th>Ambito</th>
                <th>Estado</th>
                <th>Verificacion Uchile</th>
                <th>Tipo Reunion</th>
                </tr>
            </thead>
            <tbody>
                {props.result_data.map(serialized_result => {
                    return (
                        <tr>
                            <td>{serialized_result["id_ponencia"]}</td>
                            <td>{serialized_result["ambito"][0]["nombre_ambito"]}</td>
                            <td>{serialized_result["estado_ponencia"][0]["nombre_est_ponencia"]}</td>
                            <td>{serialized_result["estado_verificacion_uchile"][0]["nombre_est_verif_uchile"]}</td>
                            <td>{serialized_result["tipo_reunion"][0]["nombre_tip_reu"]}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
        </>
    );
}



const Results = (props) => {

    return (
        <>
        <Container fluid="md">
            <Row>
                < ResultTable result_data={props.results_data}/>
            </Row>
            <Row styler={{marginTop: "10vh"}}>
                <Col></Col>
                <Col></Col>
                <Col xs={5}>
                    <Paginator />
                </Col>
                <Col></Col>
            </Row>
        </Container>
        </>
    );
}

export default Results;