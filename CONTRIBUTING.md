# Contributing

Thank you for helping improve OllyGarden's public GitHub profile, community
standards, and shared workflows.

## Before you begin

- Read and follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Search existing issues and pull requests before proposing a change.
- Open an issue before substantial policy, governance, legal, or reusable
  workflow changes so maintainers can confirm the direction and rollout.
- Report vulnerabilities privately according to the
  [security policy](SECURITY.md), never through a public issue or pull request.
- Contributions require acceptance of the [Contributor License Agreement](CLA.md).
  The CLA bot guides first-time contributors through signing.

## Prepare a change

1. Fork the repository and create a branch from the current `main` branch.
2. Make one focused change. Avoid unrelated refactors, dependency updates,
   generated changes, or broad formatting.
3. Update related documentation, workflow caller guidance, and configuration
   when the change requires it.
4. Validate the exact files and behavior you changed.

Use Conventional Commits for commits and pull request titles:

```text
<type>(<optional scope>): <short imperative description>
```

Common types include `docs`, `fix`, `feat`, `chore`, and `ci`. Examples:

- `docs: clarify inherited security policy`
- `fix(cla): preserve checks across pull requests`
- `docs(profile): update project links`

Mark breaking changes with `!` before the colon and explain them in a
`BREAKING CHANGE:` footer. Pull requests are squash-merged, so their titles
must also follow Conventional Commits.

## Validate

Always run:

```bash
git diff --check
```

For Markdown changes, check every changed relative link and render or lint the
changed files. For workflow changes, parse the YAML and run `actionlint` when
available. For `renovate.json`, parse it as JSON and use Renovate's validator
when changing behavior.

Reusable workflow changes need additional review of:

- caller events and permissions;
- GitHub expression and concurrency behavior;
- immutable third-party action pins;
- signature storage and branch behavior; and
- the rollout needed by repositories that pin this workflow by commit SHA.

## Open the pull request

Include:

- a summary and motivation;
- the exact validation commands and results;
- risk, organization-wide impact, and rollout notes, or `None`;
- a linked issue when applicable; and
- matching documentation, configuration, and caller updates.

Do not include secrets, credentials, signature records, customer data, or
production exports. Contributors remain responsible for reviewing and owning
the correctness and licensing of work produced with automated tools.

Maintainers review changes according to [GOVERNANCE.md](GOVERNANCE.md) and
`.github/CODEOWNERS`.
