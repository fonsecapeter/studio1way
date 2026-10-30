# Studio 1Way — notes for coding agents

The baseline for any contribution lives in CONTRIBUTING.md; the
human-facing setup lives in the README (Development section).
This file is only what an agent needs on top of those. Keep it
short: if a fact can be read from the code or the README, it does
not belong here.

## Ground rules

- The Maven build formats Java sources with prettier as it goes
  (CI runs the same plugin as a check, so unformatted Java fails
  there); frontend style is `bin/fe/lint` / `bin/fe/lint-fix`.
- Changing the GraphQL schema? Regenerate the frontend types with
  `bin/fe/codegen`.
- Ports: site on 8080, GraphQL API on 8081 (also proxied through
  8080 in dev).

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
