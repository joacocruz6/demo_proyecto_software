
import React from "react";
import {Button} from "react-bootstrap";
import make_query from "../utils/make_query";

const Cotizacion = (props) => {
    const clickEvent = () => make_query(props.resource).then(json_data => console.log(json_data));
    return (
        <div>
            <h1>Cotizacion</h1>
            <Button onClick={clickEvent}>Make query</Button>
        </div>
    );
};

export default Cotizacion;