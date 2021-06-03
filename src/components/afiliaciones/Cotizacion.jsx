
import React from "react";
import {Button} from "react-bootstrap";

const Cotizacion = () => {
    let rut = ["0000008842"];
    let url = "http://gateway.openfaas:8080/function/planilla-go/query";
    let variables = {
        rut: rut
    };
    let operation_name = "GetRowPlanilla"
    let query = "query GetRowPlanilla($rut: [String]) {\n  getRowsPlanilla(filter: {rut: $rut}) {\n    total_rows\n    planilla {\n      numero\n      nombres\n      paterno\n      materno\n      cotiza {\n        fecha\n        afp {\n          nombre\n          url\n          vigencia\n        }\n      }\n    }\n  }\n}\n"
    let make_query = () => {fetch(url, 
        {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Accept-Encoding": "gzip, deflate, br",
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
                "Accept-Encoding": "gzip, deflate, br",
            },
            keepalive: true,
            body: JSON.stringify({
                operationName: operation_name,
                query: query,
                variables: variables,
            })
    }).then(response => response.json()).then(response => console.log(response));};
    return (
        <div>
            <h1>Cotizacion</h1>
            <Button onClick={make_query}>Make query</Button>
        </div>
    );
};

export default Cotizacion;