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
- Keep the organization profile concise and public-facing. Put maintainer
  details in the root README or contribution guide instead.
- Never commit secrets, credentials, signature records, customer data, or
  production exports. CLA signatures belong in each caller repository's
  `cla-signatures` branch, not in this repository's default branch.
- Do not create `.agents/skills` or `.claude/skills` unless this repository
  gains real, tracked local skills.

## Validation

Run the checks relevant to the files changed:

| Change | Required validation |
| --- | --- |
| Any change | `git diff --check` |
| Markdown | Check local relative links and render or lint the changed files |
| Reusable workflow | Parse `.github/workflows/cla.yml` as YAML and run `actionlint` when available |
| Renovate configuration | Parse `renovate.json` as JSON and validate it with Renovate when behavior changes |
| Organization profile | Review `profile/README.md` as public-facing content and verify its links |
| Community policy | Check cross-document links and obtain CODEOWNER review |

For a workflow behavior change, also validate the caller event and permission
contract documented in `README.md`. Repositories that consume the reusable
workflow pin immutable commits, so coordinate any required caller updates after
the shared change merges.

## Pull requests

Follow `CONTRIBUTING.md`. Keep one logical change per pull request, document
exact validation results, and call out organization-wide impact and rollout
requirements explicitly.
