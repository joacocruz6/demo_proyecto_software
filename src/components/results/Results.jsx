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
            <Pagination.Item key={pageNumber}>{pageNumber}</Pagination.Item>
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
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
        </>
    );
}



const Results = () => {
    return (
        <>
        <Container fluid="md">
            <Row>
                < ResultTable />
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