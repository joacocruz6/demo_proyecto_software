import React from 'react';
import { Table, Spinner } from 'react-bootstrap';



const PonenciaTable = (props) => {
    let spinner = <Spinner animation="grow" size="sm" role="status"><span className="sr-only">Loading...</span></Spinner>
    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Fecha</th>
                        <th>Ambito</th>
                        <th>Estado</th>
                        <th>Verificacion Uchile</th>
                        <th>Tipo Reunion</th>
                    </tr>
                </thead>
                <tbody>
                    {spinner}
                </tbody>
            </Table>
        </>
    );
};

export default PonenciaTable;