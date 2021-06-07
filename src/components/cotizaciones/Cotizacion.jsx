import React, { useState } from "react";
import { Table, Spinner, Container } from "react-bootstrap";
import make_query from "../utils/make_query";

const Cotizacion = (props) => {
  const [useSpinner, setUseSpinner] = useState(true);
  const [tableInfo, setTableInfo] = useState([]);
  let spinner = useSpinner ? (
    <Spinner animation="grow" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    ""
  );
  if (useSpinner) {
    make_query(props.resource + `?rut=${props.rut}`).then((json_data) => {
      if (useSpinner) {
        console.log(json_data);
        console.log(json_data.data.getRowsCotiza.cotiza);
        setUseSpinner(false);
        setTableInfo(json_data.data.getRowsCotiza.cotiza);
      }
    });
  }
  return (
    <Container>
      <h1>Mis Cotizaciones</h1>
      <h3>Rut persona: {props.rut}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre Afp</th>
            <th>Porcentaje</th>
            <th>Monto Cotizacion Voluntaria</th>
            <th>Url AFP</th>
          </tr>
        </thead>
        <tbody>
          {spinner}
          {tableInfo.map((serializedResult) => {
            console.log(serializedResult);
            let afp = serializedResult["afp"];
            return (
              <tr>
                <td>{new Date(serializedResult["fecha"]).toDateString()}</td>
                <td>{afp[0]["nombre"]}</td>
                <td>{afp[0]["porcent"]}</td>
                <td>
                  {serializedResult["monto_cotiz_vol"] === null
                    ? 0
                    : serializedResult["monto_cotiz_vol"]}
                </td>
                <td>{afp[0]["url"]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Cotizacion;
