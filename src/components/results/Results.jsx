import React from 'react';
import {Pagination, Container, Row, Col, Table} from 'react-bootstrap';

const Paginator = (props) => {
    const nextPage = () => {
        if(props.page_number === props.total_pages) return;
        props.page_event(props.page_number+1, props.results_per_page)();
        props.set_page_number(props.page_number+1);
    }
    const previousPage = () => {
        if(props.page_number === 0) return;
        props.set_page_number(props.page_number-1);
        props.page_event(props.page_number-1, props.results_per_page)();
    }
    const previous = props.page_number===1 ? <Pagination.Item key={"Anterior"} disabled>{"Anterior"}</Pagination.Item>:<Pagination.Item onClick={previousPage} key={"Anterior"}>{"Anterior"}</Pagination.Item>;
    const next = props.page_number === props.total_pages ? <Pagination.Item  onClick={nextPage} key={"Siguiente"} disabled>{"Siguiente"}</Pagination.Item>: <Pagination.Item  onClick={nextPage} key={"Siguiente"}>{"Siguiente"}</Pagination.Item>;
    return (
        <>
        <Pagination>
            {previous}
            <Pagination.Item key={props.page_number-1} disabled>{props.page_number}</Pagination.Item>
            {next}
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
                    <Paginator page_event={props.page_event} total_pages={props.total_pages} page_number={props.page_number} set_page_number={props.set_page_number} results_per_page={props.results_per_page}/>
                </Col>
                <Col></Col>
            </Row>
        </Container>
        </>
    );
}

export default Results;