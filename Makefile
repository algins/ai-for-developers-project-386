help:
	@echo "Available commands:"
	@echo "  make setup - install all dependencies"
	@echo "  make docs  - generate OpenAPI from TypeSpec"
	@echo "  make frontend-types - generate frontend TS API types"
	@echo "  make frontend-sync  - regenerate docs and frontend types"
	@echo "  make frontend-start - run frontend with Prism mock"
	@echo "  make frontend-check - run frontend typecheck + lint + build"

setup:
	npm install
	cd frontend && npm install

docs:
	npx tsp compile .

frontend-types:
	cd frontend && npm run generate:types

frontend-sync: docs frontend-types

frontend-start:
	cd frontend && npm run dev:with-mock

frontend-check:
	cd frontend && npm run typecheck && npm run lint && npm run build
