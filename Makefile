.DEFAULT_GOAL := help

run-proxy:
	@python3 graphql.py

run-demo:
	@npm start

proxy-install:
	@echo "Installing proxy dependencies"
	@python3 -m pip install -r requirements.txt

demo-install:
	@echo "Installing node packages"
	@npm install

install: proxy-install demo-install
	
	

help:
	@echo "run-proxy: Run the proxy server to the openfaas on port 8000"
	@echo "run-demo: Run the front end demo on port 3000"
	@echo "proxy-install: Install the proxy dependencies"
	@echo "demo-install: Install the npm dependencies"
	@echo "install: Install all the proyect dependencies"