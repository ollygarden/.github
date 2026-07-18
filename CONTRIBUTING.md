# Contributing to OllyGarden projects

Thank you for contributing to an OllyGarden project. These guidelines are the
organization-wide default for public repositories that do not define their own
`CONTRIBUTING.md`. Follow repository-specific instructions when they exist,
including the repository's README and `AGENTS.md`.

## Before you begin

- Read and follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Search the target repository's existing issues and pull requests before
  proposing a change.
- Open or link an issue before substantial or cross-cutting changes so
  maintainers can confirm the direction and rollout.
- Report vulnerabilities privately according to the
  [security policy](SECURITY.md), never through a public issue or pull request.
- Some participating repositories require acceptance of the
  [Contributor License Agreement](CLA.md). Where installed, the repository's
  CLA check guides first-time contributors through signing.

## Prepare a change

1. Fork the target repository and create a branch from its current default
   branch.
2. Make one focused change. Avoid unrelated refactors, dependency updates,
   generated changes, or broad formatting.
3. Update related documentation, tests, and configuration when the change
   requires it.
4. Validate the exact files and behavior you changed.

Use Conventional Commits for commits and pull request titles:

```text
<type>(<optional scope>): <short imperative description>
```

Common types include `docs`, `fix`, `feat`, `chore`, and `ci`. Examples:

- `docs: clarify contributor setup`
- `fix(api): preserve trace context`
- `chore(deps): update a dependency`

Keep the description concise and imperative. Mark breaking changes with `!`
before the colon and explain them in a `BREAKING CHANGE:` footer. Use the same
format for the pull request title so squash merges preserve conventional
history.

## Validate

Always run:

```bash
git diff --check
```

Run the target repository's documented checks for every affected language,
service, package, workflow, or deployment artifact. Report exact commands and
results. Do not treat unrelated pre-existing failures as passing validation.

## Open the pull request

Include:

- a summary and motivation;
- the exact validation commands and results;
- risk and rollout notes, or `None`;
- a linked issue when applicable; and
- matching documentation, configuration, and tests.

Do not include secrets, credentials, signature records, customer data, or
production exports. Contributors remain responsible for reviewing and owning
the correctness and licensing of work produced with automated tools.

Maintainers review changes according to the target repository's ownership
rules and OllyGarden's [governance policy](GOVERNANCE.md).

## Changes to `ollygarden/.github`

This repository owns OllyGarden's public organization profile, default
community-health files, and reusable workflows. A supported community-health
file added here can become the organization-wide default for public
repositories that do not define their own version. Treat those changes as
public, cross-repository policy changes and describe their inherited impact in
the pull request.

Open an issue before substantial policy, governance, legal, or reusable
workflow changes so maintainers can confirm the direction and rollout. Keep
maintainer-specific details in this repository's README or `AGENTS.md`, not in
organization-wide defaults.

For Markdown changes, check every changed relative link and render or lint the
changed files. For workflow changes, parse the YAML and run `actionlint` when
available. For `renovate.json`, parse it as JSON and use Renovate's validator
when changing behavior.

Reusable workflow changes need additional review of:

- caller events and permissions;
- GitHub expression and concurrency behavior;
- immutable third-party action pins;
- signature storage and branch behavior; and
- the rollout needed by repositories that pin a workflow by commit SHA.

This repository does not currently install an event-triggered caller for its
own reusable CLA workflow, so contributors should not expect an automated CLA
check on its pull requests. Maintainers review changes according to
[GOVERNANCE.md](GOVERNANCE.md) and `.github/CODEOWNERS`.
