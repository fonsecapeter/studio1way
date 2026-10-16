# Studio 1Way — notes for coding agents

The human-facing setup lives in the README (Development section);
this file is only what an agent needs on top of it. Keep it short:
if a fact can be read from the code or the README, it does not
belong here.

## Ground rules

- **Merging to `main` deploys to production**
  (https://www.studio1way.com) via CircleCI → Heroku. Open a PR;
  the owner merges. Treat every merge as a release.
- **Drive everything through `bin/`** (`bin/list` enumerates it).
  Do not improvise raw docker/maven/npm commands.
- **Tests are the gate**: `bin/test` + `bin/fe/test`, both green,
  before proposing a change. The backend suite loads every project
  JSON at startup, so green tests also prove the portfolio data is
  valid. The Maven build formats Java sources with prettier as
  it goes (CI runs the same plugin as a check, so unformatted
  Java fails there); frontend style is `bin/fe/lint` /
  `bin/fe/lint-fix`.
- Changing the GraphQL schema? Regenerate the frontend types with
  `bin/fe/codegen`.
- Ports: site on 8080, GraphQL API on 8081 (also proxied through
  8080 in dev).
- Commits are single-purpose. Portfolio additions follow the
  pattern `Add <name lowercase>` — see the skill below.

## Running it: Docker by default

Docker is the primary path (`bin/up`, README has the details).
The one exception: **Muse's own sandbox**, where containers cannot
execute (the sandbox blocks the syscalls runc needs). From Muse,
use the `bin/native/*` equivalents (JDK 21 + Node 20; details in
the README's "Without Docker" section). Everywhere else —
including a developer's Mac — prefer Docker.

Commits authored from Muse carry a
`Co-authored-by: Tony (Muse) <tony@muse.local>` trailer.

## Skills

- Adding a portfolio project: `.agents/skills/add-project/SKILL.md`
  (project JSON format, image sets, field rules, validation
  scripts). A pointer copy lives under `.claude/skills/add-project/`
  for tools that only scan that directory.
