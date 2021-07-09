import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PonenciaTable from './PonenciaTable/PonenciaTable';
import CreatePonenciaSection from './PonenciaCreateModal/PonenciaCreateModal';

const Ponencia = () => {
    return (
        <>
            <Container fluid="md">
                <Row>
                    <CreatePonenciaSection />
                </Row>
                <Row style={{marginTop:"10vh" }}>
                    <PonenciaTable />
                </Row>
            </ Container>
        </>
    );
};

export default Ponencia;