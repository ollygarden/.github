# .github
OllyGarden - a garden full of delicious observability experiments

This repository also provides OllyGarden's default community health files for
public repositories that do not define their own:

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security policy](SECURITY.md)
- [Support](SUPPORT.md)

It also hosts a [reusable CLA workflow](.github/workflows/cla.yml). Each participating repository
keeps its own `CLA.md` and a small caller workflow with the relevant events and permissions. The
reusable workflow runs with the caller repository's context and stores signatures on that
repository's `cla-signatures` branch.

Caller workflows must handle `issue_comment` (`created`) and `pull_request_target` (`opened`,
`closed`, and `synchronize`) events and grant `actions: write`, `contents: write`,
`pull-requests: write`, and `statuses: write` to the calling job. The repository's
`cla-signatures` branch must remain writable and must not be protected by branch rules so the CLA
action can create and update `signatures/cla.json`.
