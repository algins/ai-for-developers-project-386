setup:
	npm install

compile:
	npx tsp compile .

watch:
	npx tsp compile . --watch

.PHONY: setup compile watch
