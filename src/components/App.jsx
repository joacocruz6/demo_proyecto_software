import Cotizacion from "./afiliaciones/Cotizacion.jsx";
import React from 'react';
import Navigation from './navbar/Navigation.jsx';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const App = () => {
    return (
        <>
        <Router>
            <Navigation name="Joaquin"/>
        
        <Link to="/cotizaciones">
            Cotizaciones
        </Link>
        <Switch>
            <Route path="/Cotizaciones">
                <Cotizacion resource="/planillas" />
            </Route>
        </Switch>
        </Router>
        </>
    );
};

export default App;