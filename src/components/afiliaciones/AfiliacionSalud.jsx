import React, { useState } from "react";
import { Container, Table, Spinner} from "react-bootstrap";
import make_query from "../utils/make_query";

const AfiliacionSalud = (props) => {
  const [afilBanco, setBanco] = useState([]);
  const [useSpinner, setUseSpinner] = useState(true);
  let spinner = useSpinner ? (
    <Spinner animation="grow" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    ""
  );
  if (useSpinner){
    make_query(props.resource + `?rut=${props.rut}`).then((jsonData) => {
      const keys = Object.keys(jsonData.data.getAfiliacionSaludVigente);
      const values = Object.values(jsonData.data.getAfiliacionSaludVigente);
      let newArr = [];
      for (let i = 0; i < keys.length; i++) {
        newArr.push({ key: keys[i], value: values[i] });
      }
      setBanco(newArr);
      setUseSpinner(false);
    });
  }
  return (
    <Container>
      <h1>Afiliación Salud Vigente</h1>
      <h3>Rut persona: {props.rut}</h3>
      {spinner}
      <Table striped bordered responsive>
        <thead>
          <tr>
            {afilBanco.map((el) => {
              return <th>{el.key}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {afilBanco.map((el) => {
              return <td>{el.value}</td>;
            })}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default AfiliacionSalud;
