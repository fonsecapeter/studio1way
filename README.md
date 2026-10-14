# Official Studio 1Way Website

[![Build Status, hopefully green...](https://circleci.com/gh/fonsecapeter/studio1way.svg?style=svg)](https://app.circleci.com/pipelines/github/fonsecapeter/studio1way)

> WORK IN PROGRESS

The future home of all my art (portfolio + inventory + sales + inquiries)

Check it out at [studio1way.com](https://www.studio1way.com)

## Buzzwords:

- Graphql
- Spring Boot
- React
  - Code Splitting
- TypeScript
- Sass
- Docker
- Continuous Deploys
  - To Heroku Through CircleCI

## Development

Requires [docker](https://www.docker.com/community-edition)

- `bin/up`
- `bin/open` or visit `http://localhost:8080`
- `bin/test`
- `bin/fe/test`
- See other commands at `bin/list`

### Without Docker (native)

Needs JDK 21 + Node 20 on your PATH. The app reads its data from the
checkout itself — `bin/native/*` sets `APP_ROOT` to the repo root (it
defaults to `/app`, the Docker layout) plus the env docker-compose
would normally inject.

- `bin/native/up` — build + run (site at `http://localhost:8080`)
- `bin/native/test` and `bin/native/fe/test`
- See other commands at `bin/native/list`
