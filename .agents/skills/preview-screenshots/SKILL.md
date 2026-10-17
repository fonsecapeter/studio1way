---
name: preview-screenshots
description: How PR preview screenshots work for the Studio 1Way site — CI captures the pages a PR changes and posts them to the PR as a comment. Covers the page-selection mapping, the artifacts contract, and the comment token setup. Use when working on the screenshots CI job, wondering where a PR's preview images come from, or setting up the comment posting.
---

# Preview screenshots

Every PR gets screenshots of the pages it changes, captured by CI and
posted to the PR as a comment. Reviewers look at the pictures before
merging instead of imagining them.

## How it works

1. The `screenshots` job in `.circleci/config.yml` builds the prod
   image, boots it, and diffs the branch against `main` to choose
   pages (mapping below).
2. A headless Chromium container sharing the app container's network
   namespace captures each page. (Under CircleCI's remote Docker,
   published ports are not reachable from the job — the shared
   namespace is what makes localhost work.) PNGs are stored as build
   artifacts; screenshots never enter source control.
3. `scripts/post-previews` posts one comment on the PR embedding the
   artifact URLs, and updates that same comment on re-runs — it
   finds it by an HTML marker (`<!-- preview-screenshots -->`).
   GitHub proxies the artifact URLs, so the images render inline.

## Which pages

- A changed project JSON → that project's detail page + its
  category list. Data directories map to routes: `woodworks` →
  `/wood`, `ceramicwares` → `/ceramics`, `paintings` → `/paint`,
  `experiments` → `/experimental`. Project ids come from the JSON
  file name (`desktop_status.json` → `desktop-status`).
- A frontend or backend change → home + all four category lists.
- Anything else → no captures.

The chosen set is written to `screenshots/pages.txt` (page path →
file name), stored with the artifacts as the manifest. Captures are
capped at 8 pages. Each page retries once; one failed capture does
not fail the job, but zero successes out of a non-empty set does.

## Setup

Commenting needs a credential the checkout keys don't provide: a
fine-grained GitHub token, this repository only, with Issues
read/write (PR comments are issue comments), stored in CircleCI as
the `GITHUB_COMMENT_TOKEN` environment variable. Project env vars
are the standard CircleCI mechanism — the deploy job's Heroku
settings work the same way. Without the token, the post step prints
the comment it would have posted and skips; builds stay green.

## For agents

- Don't post preview comments by hand; CI owns the one marked
  comment. If it is missing, check the screenshots job's log first.
- A project add is the common case: expect the new project's detail
  page and its category list in the comment.
