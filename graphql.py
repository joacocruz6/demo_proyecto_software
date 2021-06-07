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


class PlanillaResource(GraphQLResource):
    url = "https://openfaas-desa.uchile.cl/function/planilla-go/query"
    operation_name = "GetRowPlanilla"
    query = "query GetRowPlanilla($rut: [String]) {\n  getRowsPlanilla(filter: {rut: $rut}) {\n    total_rows\n    planilla {\n      numero\n      nombres\n      paterno\n      materno\n      cotiza {\n        fecha\n        afp {\n          nombre\n          url\n          vigencia\n        }\n      }\n    }\n  }\n}\n"

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
        variables = {"rut": ["0000008842"]}
        return variables


app = falcon.App(middleware=falcon.CORSMiddleware(allow_credentials="*"))
planilla = PlanillaResource()
afiliaciones = AfiliacionesResource()
app.add_route("/planillas", planilla)
app.add_route("/afiliaciones", afiliaciones)

if __name__ == "__main__":
    with make_server("", 8000, app) as httpd:
        print("Serving on port 8000...")
        httpd.serve_forever()
