import React, { useState } from "react";
import { Table, Spinner, Alert, Button} from "react-bootstrap";
import make_query from "../../utils/make_query";

const PonenciaTable = (props) => {
  const [ponenciaData, setPonencia] = useState([]);
  const [useSpinner, setUseSpinner] = useState(true);
  const [error, setError] = useState(false);
  let spinner = useSpinner ? (
    <Spinner animation="grow" size="sm" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    ""
  );
  let errorMessage = error ? <Alert onClose={() => setError(false)} dismissible="true" variant="danger">There was an error on the proxy</Alert>: "";
  if (useSpinner){
    make_query(props.resource + `?indiv_id=${props.id}`).then((jsonData) => {
        console.log(jsonData)
        if(jsonData.data.getRowsPonencia_middleware === null){
          setUseSpinner(false);
          setError(true);
          return;
        }
        const keys = Object.keys(jsonData.data.getRowsPonencia_middleware);
        const values = Object.values(jsonData.data.getRowsPonencia_middleware);
        let newArr = [];
        for (let i = 0; i < keys.length; i++) {
          newArr.push({ key: keys[i], value: values[i] });
        }
        setPonencia(newArr);
        setUseSpinner(false);
      });
  }
  const deletePonencia = id_ponencia => () => window.confirm("Estas seguro?");
  return (
    <>
      {errorMessage}
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {spinner}
          {ponenciaData.length>0 ? ponenciaData[0].value.map((serialized_result,index) => {
            return (
              <tr>
                <td>{serialized_result["id_ponencia"]}</td>
                <td>{serialized_result["titulo"]}</td>
                <td>{new Date(serialized_result["fecha"]).toDateString()}</td>
                <td>{serialized_result["ambito"][0]["nombre_ambito"]}</td>
                <td>{serialized_result["estado_ponencia"][0]["nombre_est_ponencia"]}</td>
                <td>{serialized_result["estado_verificacion_uchile"][0]["nombre_est_verif_uchile"]}</td>
                <td>{serialized_result["tipo_reunion"][0]["nombre_tip_reu"]}</td>
                <td><Button variant="danger" onClick={deletePonencia(serialized_result["id_ponencia"])}>Borrar</Button></td>
              </tr>
            )
          }) : ""}
        </tbody>
      </Table>
    </>
  );
};

export default PonenciaTable;
