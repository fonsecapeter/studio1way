# Contributing to Studio 1Way

The baseline for any contribution, human or agent. Setup and
development live in the README; agent-specific notes live in
AGENTS.md. This file is only what applies to every change.

## Ground rules

- **Merging to `main` deploys to production**
  (https://www.studio1way.com) via CircleCI → Heroku. Open a
  PR; the owner merges. Treat every merge as a release.
- **Commits are single-purpose.** Portfolio additions follow
  the pattern `Add <name lowercase>`.
- **One commit per PR, short and focused.** A PR does one
  thing; separable changes get separate PRs.
- **Drive everything through `bin/`**: build, test, and local
  run all go through the repo's `bin/` scripts (`bin/list`
  enumerates them). Do not improvise raw docker/maven/npm
  commands.
- **Tests are the gate**: `bin/test` + `bin/fe/test`, both
  green, before proposing a change. The backend suite loads
  every project JSON at startup, so green tests also prove
  the portfolio data is valid.

## PR preview screenshots

CI captures the pages a diff touches (project data → that
project; components and styles → the pages that render them)
plus a core set (home, portfolio index, a sample project
detail, a department page), at desktop and mobile widths,
and posts them as a PR comment.

For extra pages on a specific PR, add routes to
`preview-pages.txt` at the repo root, one per line. It only
adds pages. The file belongs to the current PR: set it to
exactly the routes your PR needs (or back to comment-only),
clearing anything an earlier PR left behind in the same
diff. No follow-up reset is ever needed.

Read the screenshots before calling a PR done: they are the
check that the change renders as expected and nothing else
regressed. Green CI is not visual proof.
