
import React from "react";
import {Button} from "react-bootstrap";

const Cotizacion = (props) => {
    let url = `http://localhost:8000${props.resource}`;
    let make_query = () => {fetch(url).then(response => response.json()).then(response => console.log(response));};
    return (
        <div>
            <h1>Cotizacion</h1>
            <Button onClick={make_query}>Make query</Button>
        </div>
    );
};

export default Cotizacion;