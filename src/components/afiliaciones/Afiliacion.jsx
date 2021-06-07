import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import make_query from "../utils/make_query";

const Afiliacion = (props) => {
  const [afilBanco, setBanco] = useState([]);
  make_query(props.resource).then((jsonData) => {
    const keys = Object.keys(jsonData.data.getAfiliacionBancaria);
    const values = Object.values(jsonData.data.getAfiliacionBancaria);
    let newArr = [];
    for (let i = 0; i < keys.length; i++) {
      newArr.push({ key: keys[i], value: values[i] });
    }
    setBanco(newArr);
  });
  
  return (
    <Container>
      <h1>Afiliación Bancaria</h1>
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

export default Afiliacion;
