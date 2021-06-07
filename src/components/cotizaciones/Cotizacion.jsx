import React, {useState} from "react";
import {Table, Spinner} from "react-bootstrap";
import make_query from "../utils/make_query";

const Cotizacion = (props) => {
    const [useSpinner, setUseSpinner] = useState(true);
    const [tableInfo, setTableInfo] = useState([]);
    
    let spinner = useSpinner ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : "";
    make_query(props.resource).then(json_data => {
        if(useSpinner){
            console.log(json_data.data.getRowsPlanilla.planilla);
            setUseSpinner(false);
            setTableInfo(json_data.data.getRowsPlanilla.planilla);
        }
    });
    return (
        <div>
            <h1>Mis Cotizaciones</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Fecha</th>
                        <th>Nombre Afp</th>
                    </tr>
                </thead>
                <tbody>
                {spinner}
                {tableInfo.map(serializedResult =>{
                    console.log(serializedResult);
                    return (
                        <tr>
                            <td>{serializedResult["numero"]}</td>
                            <td>{new Date(serializedResult["cotiza"][0]["fecha"]).toDateString()}</td>
                            <td>{serializedResult["cotiza"][0]["afp"][0]["nombre"]}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default Cotizacion;