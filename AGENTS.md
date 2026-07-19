# Repository guidance

## Purpose

This public repository provides OllyGarden's organization profile, default
community-health files, and reusable GitHub workflows. GitHub makes supported
community-health files available to public repositories in the organization
when those repositories do not define their own versions.

Changes here can affect many repositories. Keep edits focused, preserve the
public contribution and security boundaries, and review inherited policy
changes more carefully than ordinary documentation changes.

## Repository map

- `README.md`: repository overview and operational notes for maintainers.
- `CONTRIBUTING.md`: organization-wide default contribution guidance, with a
  section specifically for changes to this repository.
- `profile/README.md`: the public OllyGarden organization profile displayed on
  GitHub.
- `CODE_OF_CONDUCT.md`, `GOVERNANCE.md`, `SECURITY.md`, and `SUPPORT.md`:
  organization-wide community-health defaults.
- `CLA.md`: the agreement linked by the reusable CLA workflow.
- `.github/workflows/cla.yml`: reusable CLA workflow called by participating
  repositories.
- `.github/CODEOWNERS`: ownership for all policy and workflow changes.
- `renovate.json`: organization-level Renovate configuration.

`LICENSE` is Apache License 2.0 and must remain intact unless maintainers make
an explicit licensing decision.

## Change boundaries

- Do not change legal, governance, conduct, security, or support policy as a
  side effect of documentation cleanup.
- Treat `CLA.md`, `GOVERNANCE.md`, and `LICENSE` as legally or organizationally
  sensitive. Explain the intended policy change and obtain the required owner
  review.
- Keep vulnerability details out of issues and pull requests. Follow
  `SECURITY.md` for private reporting.
- Preserve the permissions, caller contract, immutable action pin, signature
  branch, and concurrency behavior in `.github/workflows/cla.yml` unless the
  pull request specifically changes and validates that behavior.
- CLA callers listen for `pull_request_target` lifecycle events and new
  `issue_comment` events, but their job-level condition must admit comments
  only for an issue that is a pull request and whose body is exactly `recheck`
  or the documented CLA-signature statement.
- The reusable implementation is pinned by callers, but its
  `path-to-document` follows `CLA.md` on this repository's `main` branch. A CLA
  text change therefore affects future signing without a caller repin and
  needs legal/governance review on that basis.
- Keep the organization profile concise and public-facing. Put maintainer
  details in the root README or contribution guide instead.
- Never commit secrets, credentials, signature records, customer data, or
  production exports. CLA signatures belong in each caller repository's
  `cla-signatures` branch, not in this repository's default branch.
- Do not create `.agents/skills` or `.claude/skills` unless this repository
  gains real, tracked local skills.

## Current operational contracts

- `.github/CODEOWNERS` requests `@jpkrohling` and `@niwoerner` for every
  repository change. The live rules do not require CODEOWNER approval or any
  approving review. `GOVERNANCE.md` separately requires the project lead's
  approval for governance changes; do not treat a requested CODEOWNER as a
  substitute for that policy.
- The CLA concurrency key scopes runs by caller repository and pull request,
  with issue-number and run-ID fallbacks. Runs for one pull request are
  serialized with `cancel-in-progress: false`; unrelated pull requests do not
  compete for one pending slot.
- Each caller stores `signatures/cla.json` on its own unprotected
  `cla-signatures` branch. Do not copy signature data into this repository or
  apply default-branch rules to that storage branch.
- `renovate.json` is global Mend Renovate configuration. Its `hostRules` entry
  supplies the Mend credential template `{{ secrets.GO_GITHUB_TOKEN }}` to Go
  module access on `github.com`. Never replace the template with a token or
  change its host/type scope without validating private-module artifact
  updates.

## Validation

Run the checks relevant to the files changed:

| Change | Required validation |
| --- | --- |
| Any change | `git diff --check` |
| Markdown | Check local relative links and render or lint the changed files |
| Reusable workflow | Parse `.github/workflows/cla.yml` as YAML and run `actionlint` when available |
| Renovate configuration | Parse `renovate.json` as JSON and validate it with Renovate when behavior changes |
| Organization profile | Review `profile/README.md` as public-facing content and verify its links |
| Community policy | Check cross-document links and request CODEOWNER review; governance changes additionally require project-lead approval |

For a workflow behavior change, also validate the caller event and permission
contract documented in `README.md`. Repositories that consume the reusable
workflow pin immutable commits, so coordinate any required caller updates after
the shared change merges.

## Pull requests

Follow `CONTRIBUTING.md`. Keep one logical change per pull request, document
exact validation results, and call out organization-wide impact and rollout
requirements explicitly.
