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


class AfiliacionBancariaResource(GraphQLResource):
    url = "https://openfaas-desa.uchile.cl/function/planilla-go/query"
    operation_name = "GetAfiliacionBancaria"
    query = "query GetAfiliacionBancaria($rut: [String]){\n  getAfiliacionBancaria(filter:{rut: $rut}){\n    fecha\n    banco\n    tipoCuenta\n    monto\n    urlBanco\n  }\n}"

    def get_variables(self, req):
        variables = {"rut": [req.get_param("rut", required=True)]}
        return variables

class AfiliacionPrevisionalResource(GraphQLResource):
    url = "https://openfaas-desa.uchile.cl/function/planilla-go/query"
    operation_name = "GetAfiliacionPrevisional"
    query = """query GetAfiliacionPrevisional($rut: [String]){
        GetAfiliacionPrevisional(filter:{rut: $rut}){
            u_numeroPlanilla
            c_afp
            c_fechaContrato
            c_tipoCotizacion
            c_cotizacionVoluntaria
            c_cuentaAhorro
            u_cotizacionVoluntaria
            u_unidadAhorro
            u_unidadCotizVolun
            u_tipoCotizacion
            u_montoAhorro
            u_tasaPrev
            u_descAfp
            u_porcDesah
            u_afp1
            c_urlafp
            u_urlafp1
            u_montoCotizVol
            u_montoAhorroVol
            u_montoApv
            u_totalDescAfp
        }
    }"""

    def get_variables(self, req):
        variables = {"rut": [req.get_param("rut", required=True)]}
        return variables


class AfiliacionSaludResource(GraphQLResource):
    url = "https://openfaas-desa.uchile.cl/function/planilla-go/query"
    operation_name = "getAfiliacionSaludVigente"
    query = """query getAfiliacionSaludVigente($rut: [String]){
        getAfiliacionSaludVigente(filter:{rut: $rut}){
            c_isapre
            c_fechaContrato
            c_fechaInicioDescuento
            c_anualidad
            c_montoPactado
            c_unidad
            c_catastroficoUf
            c_montoGes
            c_unidadGes
            c_urlisapre
            u_numeroPlanilla
            u_codTipoDesc
            u_descIsapre
            u_descAdicSalud
            u_isapre1
            u_montoPactado1
            u_unidad1
            u_fechaLiquidacion
            u_totalImpone
            u_montoDescPersonal
            u_monto
            u_urlisapre1
        }
    }"""

    def get_variables(self, req):
        variables = {"rut": [req.get_param("rut", required=True)]}
        return variables


class PonenciaResource(GraphQLResource):
    url = "https://openfaas-desa.uchile.cl/function/ponencias-middleware-go/query"
    operation_name = "GetPonenciaMiddlewareGo"
    query = "query GetPonenciaMiddlewareGo($id_persona: [Int]){\n  getRowsPonencia_middleware(filter:{id_persona: $id_persona}){\n    ponencia {\n      id_ponencia\n      fecha\n      titulo\n      tipo_reunion{\n        id_tipo_reunion\n        nombre_tip_reu\n      }\n      nombre_reunion\n      ambito{\n        id_ambito\n        nombre_ambito\n      }\n      ciudad{\n        id_ciudad\n        nombre\n      }\n      pais{\n        id_pais\n        nombre\n      }\n      estado_ponencia{\n        id_estado_ponencia\n        nombre_est_ponencia\n      }\n    \testado_verificacion_uchile{\n        id_estado_verif\n        nombre_est_verif_uchile\n      }\n      part_reunion_ponencia{\n        id_ponencia\n        id_persona\n        id_tpart_reunion\n        tpart_reunion{\n          nombre_tpart_reunion\n        }\n      }\n    }\n  }\n}"
    
    def get_variables(self, req):
        variables = {"id_persona": [int(req.get_param("indiv_id", required=True))]}
        return variables

    def on_post(self, req, resp):
        operation_name = "createPonenciaMiddlewareGo"
        variables = {
            "titulo": req.media["title"],
            "nombre_reunion": req.media["reunionName"],
        }
        query = '''
        mutation createPonenciaMiddlewareGo($titulo: String!, $nombre_reunion: String!){
            createPonenciaMiddleware(
                input:{
                    titulo: $titulo
                    nombre_reunion: $nombre_reunion
                    fecha: "2021-07-13T18:30:00-04:00"
                    id_ambito: 3
                    id_est_verif: 3
                    id_estado_ponencia: 1
                    id_pais: 32
                    id_ciudad: 471716
                    id_tipo_reunion: 8
                    id_fuente_info: 3
                    part_reunion_ponencia: [
                        {id_persona: 10000, id_tpart_reunion: 3}
                    ]
                    part_trab_ponencia: [
                        {id_persona: 10000, id_tpart_trabv_ponencia: 1}
                    ]
                }
            )
            {
                id_ponencia
                return_code
            }
        }'''
        url = self.get_url()
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
        resp.status_code = response.status_code
        resp.text = response.text

    def on_delete(self, req, resp):
        pass

app = falcon.App(middleware=falcon.CORSMiddleware(allow_credentials="*"))
planilla = CotizacionResource()
afiliacion_bancaria = AfiliacionBancariaResource()
afiliacion_previsional = AfiliacionPrevisionalResource()
afiliacion_salud = AfiliacionSaludResource()
ponencia = PonenciaResource()
app.add_route("/cotizaciones", planilla)
app.add_route("/afiliacion_bancaria", afiliacion_bancaria)
app.add_route("/afiliacion_previsional", afiliacion_previsional)
app.add_route("/afiliacion_salud", afiliacion_salud)
app.add_route("/ponencia", ponencia)

if __name__ == "__main__":
    with make_server("", 8000, app) as httpd:
        print("Serving on port 8000...")
        httpd.serve_forever()