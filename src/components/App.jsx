import Cotizacion from "./cotizaciones/Cotizacion.jsx";
import Afiliacion from "./afiliaciones/Afiliacion.jsx";
import React from 'react';
import Navigation from './navbar/Navigation.jsx';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App = () => {
    let rut = "0113672315";
    return (
        <>
        <Router>
            <Navigation name="Joaquin"/>
        <Switch>
            <Route path="/cotizaciones">
                <Cotizacion resource="/cotizaciones" rut={rut}/>
            </Route>
            <Route path="/afiliacion">
                <Afiliacion resource="/afiliaciones" />
            </Route>
        </Switch>
        </Router>
        </>
    );
};

export default App;