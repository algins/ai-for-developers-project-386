setup: install

install:
	npm install
	$(MAKE) frontend-install

build: api-docs frontend-build backend-build

api-docs:
	npx tsp compile .

frontend-install:
	cd frontend && npm install

frontend-types:
	cd frontend && npm run generate:types

frontend-sync: api-docs frontend-types

frontend-build:
	cd frontend && npm run build

frontend-lint:
	cd frontend && npm run lint

frontend-typecheck:
	cd frontend && npm run typecheck

frontend-start:
	cd frontend && npm run dev

frontend-start-dev:
	cd frontend && npm run dev:with-mock

backend-build:
	cd backend && gradle build

backend-lint:
	cd backend && gradle checkstyleMain checkstyleTest

backend-test:
	cd backend && gradle test

backend-start:
	cd backend && gradle bootRun
