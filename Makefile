# Please note, this is a standard make file.  The rakefile is included for
# temporary purposes as it is currently used to generate translations.  The
# goal of this makefile is to avoid needing to install a ruby toolchain for
# casual contributors.

PROJECT ?= 
PORT ?= 8080
APP_ENV=dev

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
	docker build -t $(PROJECT)bitcoincashorg .

.PHONY: run
run: container
	docker run -it -p $(PORT):80 $(PROJECT)bitcoincashorg:latest

serve: _config.yml
	bundler exec jekyll serve &
