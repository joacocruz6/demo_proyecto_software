import requests
import json
from typing import Dict, Any

def server(url: str, query: str, operation_name: str, variables: Dict[str, Any]):
    data = {
        "operationName": operation_name,
        "query": query,
        "variables": variables
    }
    json_data = json.dumps(data)
    headers = {
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    response = requests.post(url, headers=headers, data=json_data)
    import pdb
    pdb.set_trace()
    s = "string"


if __name__ == "__main__":
    url = "https://openfaas-desa.uchile.cl/function/planilla-go/query"
    operation_name = "GetRowPlanilla"
    query = "query GetRowPlanilla($rut: [String]) {\n  getRowsPlanilla(filter: {rut: $rut}) {\n    total_rows\n    planilla {\n      numero\n      nombres\n      paterno\n      materno\n      cotiza {\n        fecha\n        afp {\n          nombre\n          url\n          vigencia\n        }\n      }\n    }\n  }\n}\n"
    variables = {
        "rut": ["0000008842"]
    }
    server(url, query, operation_name, variables)
