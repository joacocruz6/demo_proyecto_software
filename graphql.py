import requests
import falcon
from wsgiref.simple_server import make_server
import json
from typing import Dict, Any


class ConfigurationError(Exception):
    pass


class GraphQLResource(object):
    url = None
    operation_name = None
    query = None
    error_msg = "Need to override the {} parameter or override this method"
    variables = None

    def get_url(self):
        if self.url is None:
            raise ConfigurationError(self.error_msg.format("url"))
        return self.url

    def get_operation_name(self):
        if self.operation_name is None:
            raise ConfigurationError(self.error_msg.format("operation_name"))
        return self.operation_name

    def get_query(self):
        if self.query is None:
            raise ConfigurationError(self.error_msg.format("query"))
        return self.query

    def get_variables(self, req):
        if self.variables is None:
            raise ConfigurationError(self.error_msg.format("variables"))
        return self.variables

    def on_get(self, req, resp):
        operation_name = self.get_operation_name()
        query = self.get_query()
        url = self.get_url()
        variables = self.get_variables(req)
        data = {
            "operationName": operation_name,
            "query": query,
            "variables": variables,
        }
        json_data = json.dumps(data)
        headers = {
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

        response = requests.post(url, headers=headers, data=json_data)
        resp.status = response.status_code
        resp.text = response.text


class CotizacionResource(GraphQLResource):
    url = "https://openfaas-desa.uchile.cl/function/cotiza-go/query"
    operation_name = "GetRowsCotiza"
    query = "query GetRowsCotiza($rut: [String]) {\n  getRowsCotiza(filter: { rut: $rut }) {\n    total_rows\n      cotiza {\n        fecha\n        monto_cotiz_vol\n        afp {\n          nombre\n          url\n          vigencia\n          porcent\n        }\n      }\n    }\n  }\n"

    def get_variables(self, req):
        variables = {
            "rut": [req.get_param("rut", required=True)],
        }
        return variables


class AfiliacionesResource(GraphQLResource):
    url = "https://openfaas-desa.uchile.cl/function/planilla-go/query"
    operation_name = "GetAfiliacionBancaria"
    query = "query GetAfiliacionBancaria($rut: [String]){\n  getAfiliacionBancaria(filter:{rut: $rut}){\n    fecha\n    banco\n    tipoCuenta\n    monto\n    urlBanco\n  }\n}"

    def get_variables(self, req):
        variables = {"rut": [req.get_param("rut", required=True)]}
        return variables


class PonenciaResource(GraphQLResource):
    url = "https://openfaas-desa.uchile.cl/function/ponencias-middleware-go/query"
    operation_name = "GetRowsPonencia"
    query = "query GetPonenciaMiddlewareGo($indiv_id: [String]){\n  getRowsPonencia_middleware(filter:{indiv_id: $indiv_id}){\n    ponencia {\n      id_ponencia\n      fecha\n      titulo\n      tipo_reunion{\n        id_tipo_reunion\n        nombre_tip_reu\n      }\n      nombre_reunion\n      ambito{\n        id_ambito\n        nombre_ambito\n      }\n      ciudad{\n        id_ciudad\n        nombre\n      }\n      pais{\n        id_pais\n        nombre\n      }\n      estado_ponencia{\n        id_estado_ponencia\n        nombre_est_ponencia\n      }\n    \testado_verificacion_uchile{\n        id_estado_verif\n        nombre_est_verif_uchile\n      }\n      part_reunion_ponencia{\n        id_ponencia\n        id_persona\n        id_tpart_reunion\n        tpart_reunion{\n          nombre_tpart_reunion\n        }\n      }\n    }\n  }\n}"
    
    def get_variables(self, req):
        variables = {"indiv_id": [req.get_param("rut", required=True)]}
        return variables

    def on_post(self, req, resp):
        import pdb
        pdb.set_trace()
        asd = req
        pass

    def on_delete(self, req, resp):
        pass

app = falcon.App(middleware=falcon.CORSMiddleware(allow_credentials="*"))
planilla = CotizacionResource()
afiliaciones = AfiliacionesResource()
ponencia = PonenciaResource()
app.add_route("/cotizaciones", planilla)
app.add_route("/afiliaciones", afiliaciones)
app.add_route("/ponencia", ponencia)

if __name__ == "__main__":
    with make_server("", 8000, app) as httpd:
        print("Serving on port 8000...")
        httpd.serve_forever()