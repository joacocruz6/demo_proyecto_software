import React, { useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import make_query from "../../utils/make_query";

const PonenciaTable = (props) => {
  const [ponenciaData, setPonencia] = useState([]);
  const [useSpinner, setUseSpinner] = useState(true);
  let spinner = useSpinner ? (
    <Spinner animation="grow" size="sm" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    ""
  );
  if (useSpinner){
    make_query(props.resource + `?indiv_id=${props.id}`).then((jsonData) => {
        const keys = Object.keys(jsonData.data.getRowsPonenciaMiddleware);
        const values = Object.values(jsonData.data.getRowsPonenciaMiddleware);
        let newArr = [];
        for (let i = 0; i < keys.length; i++) {
          newArr.push({ key: keys[i], value: values[i] });
        }
        setPonencia(newArr);
        setUseSpinner(false);
      });
  }
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
        <tbody>{spinner}</tbody>
      </Table>
    </>
  );
};

export default PonenciaTable;
