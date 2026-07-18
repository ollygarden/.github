# OllyGarden community standards

This public repository hosts OllyGarden's organization profile, shared
community-health files, and reusable GitHub workflows.

This repository also provides OllyGarden's default community health files for
public repositories that do not define their own:

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing guidelines](CONTRIBUTING.md)
- [Governance](GOVERNANCE.md)
- [Security policy](SECURITY.md)
- [Support](SUPPORT.md)

The [Contributor License Agreement](CLA.md) is not an inherited GitHub
community-health file. Participating repositories use it through a
[reusable CLA workflow](.github/workflows/cla.yml) and keep a small caller
workflow with the relevant events and permissions. The reusable workflow runs
with the caller repository's context and stores signatures on that
repository's `cla-signatures` branch.

Caller workflows must handle `issue_comment` (`created`) and `pull_request_target` (`opened`,
`closed`, and `synchronize`) events and grant `actions: write`, `contents: write`,
`pull-requests: write`, and `statuses: write` to the calling job. The repository's
`cla-signatures` branch must remain writable and must not be protected by branch rules so the CLA
action can create and update `signatures/cla.json`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the public contribution workflow,
validation expectations, CLA process, and pull request conventions.
Repository maintainers and automated tools should also follow
[AGENTS.md](AGENTS.md) when changing inherited policy or reusable workflows.

Security vulnerabilities must be reported privately according to
[SECURITY.md](SECURITY.md).

## License

This repository is licensed under the [Apache License 2.0](LICENSE).
