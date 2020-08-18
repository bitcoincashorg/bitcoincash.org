# Please note, this is a standard make file.  The rakefile is included for
# temporary purposes as it is currently used to generate translations.  The
# goal of this makefile is to avoid needing to install a ruby toolchain for
# casual contributors.

APP_ENV = dev
APP_VERSION = 1
PORT ?= 8080
TAG = bitcoin-cash-org

default: container

.PHONY: _config.yml
_config.yml:
	cp _config-$(APP_ENV).yml _config.yml

prod: APP_ENV=prod
prod: _config.yml

dev: APP_ENV=dev
dev: _config.yml

.PHONY: container
container:
	docker build --build-arg APP_ENV=$(APP_ENV) --build-arg APP_VERSION=$(APP_VERSION) -t $(TAG) .

.PHONY: run
run: container
	docker run -it -p $(PORT):80 $(TAG)

serve: _config.yml
	bundle exec jekyll serve
