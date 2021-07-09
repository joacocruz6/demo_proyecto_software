import Cotizacion from "./cotizaciones/Cotizacion.jsx";
import AfiliacionBancaria from "./afiliaciones/AfiliacionBancaria.jsx";
import AfiliacionSalud from "./afiliaciones/AfiliacionSalud.jsx";
import AfiliacionPrevisional from "./afiliaciones/AfiliacionPrevisional.jsx";
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
          <Route path="/afiliacion_salud">
            <AfiliacionSalud resource="/afiliacion_salud" rut={rut}/>
          </Route>
          <Route path="/afiliacion_previsional">
            <AfiliacionPrevisional resource="/afiliacion_previsional" rut={rut}/>
          </Route>
          <Route path="/afiliacion_bancaria">
            <AfiliacionBancaria resource="/afiliacion_bancaria" rut={rut}/>
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
