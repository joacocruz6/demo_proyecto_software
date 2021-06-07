import Cotizacion from "./cotizaciones/Cotizacion.jsx";
import Afiliacion from "./afiliaciones/Afiliacion.jsx";
import React from 'react';
import Navigation from './navbar/Navigation.jsx';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App = () => {
    return (
        <>
        <Router>
            <Navigation name="Joaquin"/>
    
        <Switch>
            <Route path="/cotizaciones">
                <Cotizacion resource="/planillas" />
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