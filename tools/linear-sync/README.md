# GitHub to Linear Issue Sync

A TypeScript tool that syncs GitHub issues to Linear with status and assignee mapping.

## Features

- **Issue Creation**: When a GitHub issue is opened, creates a corresponding Linear issue
- **Status Sync**: Maps GitHub issue states to Linear workflow states
  - `opened` / `reopened` → Todo
  - `closed` → Done
  - Label `in progress` → In Progress
- **Assignee Mapping**: Maps GitHub usernames to Linear users
- **Duplicate Prevention**: Checks for existing linked issues before creating

## Setup

### 1. Add Required Secrets to Your Repository

- `LINEAR_API_KEY`: Your Linear personal API key (get it from Linear Settings → API)
- `LINEAR_TEAM_ID`: The Linear team ID where issues should be created

### 2. Add the Workflow

In your repository, create `.github/workflows/linear-sync.yml`:

```yaml
name: Linear Sync

on:
  issues:
    types: [opened, closed, reopened, labeled, assigned]

jobs:
  sync:
    uses: ollygarden/.github/.github/workflows/linear-sync.yml@main
    secrets:
      LINEAR_API_KEY: ${{ secrets.LINEAR_API_KEY }}
      LINEAR_TEAM_ID: ${{ secrets.LINEAR_TEAM_ID }}
```

Or use the workflow template available in the organization's Actions tab.

## User Mapping

Currently configured user mappings (edit `src/index.ts` to modify):

| GitHub Username | Linear Display Name |
|-----------------|---------------------|
| niwoerner       | Nicolas Wörner      |

## Local Development

```bash
cd tools/linear-sync
npm install
npm run build
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `LINEAR_API_KEY` | Linear API key | Yes |
| `LINEAR_TEAM_ID` | Linear team ID | Yes |
| `GITHUB_EVENT_PATH` | Path to GitHub event JSON (set automatically in Actions) | Yes |
