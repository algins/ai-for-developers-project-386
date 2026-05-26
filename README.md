### Hexlet tests and linter status:
[![Actions Status](https://github.com/algins/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/algins/ai-for-developers-project-386/actions)

## TypeSpec Setup

This project is configured with TypeSpec following the official installation flow.

### Requirements

- Node.js 22 LTS or newer
- npm

### Make Commands

Install dependencies:

```bash
make setup
```

Compile the TypeSpec project:

```bash
make compile
```

Generated OpenAPI files are written to `tsp-output/schema/`.

Watch mode:

```bash
make watch
```