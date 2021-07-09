import Cotizacion from "./cotizaciones/Cotizacion.jsx";
import Afiliacion from "./afiliaciones/Afiliacion.jsx";
import Ponencia from "./ponencias/Ponencia.jsx";
import React from "react";
import Navigation from "./navbar/Navigation.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  let rut = "0113672315";
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/cotizaciones">
            <Cotizacion resource="/cotizaciones" rut={rut} />
          </Route>
          <Route path="/afiliacion">
            <Afiliacion resource="/afiliaciones" rut={rut}/>
          </Route>
          <Route path="/ponencias">
            <Ponencia></Ponencia>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
