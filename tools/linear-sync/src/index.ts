import { LinearClient } from "@linear/sdk";

// Configuration
interface UserMapping {
  [githubUsername: string]: string; // Linear user display name
}

const USER_MAPPINGS: UserMapping = {
  niwoerner: "Nicolas Wörner",
};

// Status mappings based on GitHub events
const STATUS_NAMES = {
  todo: "Todo",
  inProgress: "In Progress",
  done: "Done",
};

interface GitHubIssueEvent {
  action: string;
  issue: {
    number: number;
    title: string;
    body: string | null;
    html_url: string;
    state: string;
    assignee?: {
      login: string;
    } | null;
    labels: Array<{
      name: string;
    }>;
  };
  repository: {
    full_name: string;
  };
  label?: {
    name: string;
  };
}

async function getLinearClient(): Promise<LinearClient> {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    throw new Error("LINEAR_API_KEY environment variable is required");
  }
  return new LinearClient({ apiKey });
}

async function getTeamId(client: LinearClient): Promise<string> {
  const teamId = process.env.LINEAR_TEAM_ID;
  if (teamId) {
    return teamId;
  }
  throw new Error("LINEAR_TEAM_ID environment variable is required");
}

async function findUserByName(
  client: LinearClient,
  displayName: string
): Promise<string | null> {
  const users = await client.users();
  const user = users.nodes.find(
    (u) => u.displayName === displayName || u.name === displayName
  );
  return user?.id || null;
}

async function findWorkflowState(
  client: LinearClient,
  teamId: string,
  stateName: string
): Promise<string | null> {
  const team = await client.team(teamId);
  const states = await team.states();
  const state = states.nodes.find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  );
  return state?.id || null;
}

async function findExistingIssue(
  client: LinearClient,
  teamId: string,
  githubIssueUrl: string
): Promise<string | null> {
  // Search for issues that contain the GitHub URL in description
  const issues = await client.issues({
    filter: {
      team: { id: { eq: teamId } },
      description: { contains: githubIssueUrl },
    },
  });

  if (issues.nodes.length > 0) {
    return issues.nodes[0].id;
  }
  return null;
}

async function createLinearIssue(
  client: LinearClient,
  event: GitHubIssueEvent,
  teamId: string
): Promise<void> {
  const { issue, repository } = event;

  // Check if issue already exists
  const existingIssueId = await findExistingIssue(
    client,
    teamId,
    issue.html_url
  );
  if (existingIssueId) {
    console.log(`Linear issue already exists for GitHub issue #${issue.number}`);
    return;
  }

  // Get Todo status
  const todoStateId = await findWorkflowState(client, teamId, STATUS_NAMES.todo);
  if (!todoStateId) {
    throw new Error(`Could not find "${STATUS_NAMES.todo}" workflow state`);
  }

  // Map assignee if present
  let assigneeId: string | undefined;
  if (issue.assignee) {
    const linearUserName = USER_MAPPINGS[issue.assignee.login];
    if (linearUserName) {
      assigneeId = (await findUserByName(client, linearUserName)) || undefined;
    }
  }

  const description = `${issue.body || ""}\n\n---\n[GitHub Issue](${issue.html_url})`;

  const result = await client.createIssue({
    teamId,
    title: `[${repository.full_name}#${issue.number}] ${issue.title}`,
    description,
    stateId: todoStateId,
    assigneeId,
  });

  const createdIssue = await result.issue;
  console.log(`Created Linear issue: ${createdIssue?.identifier}`);
}

async function updateLinearIssueStatus(
  client: LinearClient,
  event: GitHubIssueEvent,
  teamId: string,
  statusName: string
): Promise<void> {
  const { issue } = event;

  const existingIssueId = await findExistingIssue(
    client,
    teamId,
    issue.html_url
  );
  if (!existingIssueId) {
    console.log(`No Linear issue found for GitHub issue #${issue.number}`);
    return;
  }

  const stateId = await findWorkflowState(client, teamId, statusName);
  if (!stateId) {
    throw new Error(`Could not find "${statusName}" workflow state`);
  }

  await client.updateIssue(existingIssueId, { stateId });
  console.log(`Updated Linear issue status to "${statusName}"`);
}

async function updateLinearIssueAssignee(
  client: LinearClient,
  event: GitHubIssueEvent,
  teamId: string
): Promise<void> {
  const { issue } = event;

  if (!issue.assignee) {
    console.log("No assignee on GitHub issue");
    return;
  }

  const existingIssueId = await findExistingIssue(
    client,
    teamId,
    issue.html_url
  );
  if (!existingIssueId) {
    console.log(`No Linear issue found for GitHub issue #${issue.number}`);
    return;
  }

  const linearUserName = USER_MAPPINGS[issue.assignee.login];
  if (!linearUserName) {
    console.log(
      `No Linear user mapping for GitHub user "${issue.assignee.login}"`
    );
    return;
  }

  const assigneeId = await findUserByName(client, linearUserName);
  if (!assigneeId) {
    console.log(`Could not find Linear user "${linearUserName}"`);
    return;
  }

  await client.updateIssue(existingIssueId, { assigneeId });
  console.log(`Updated Linear issue assignee to "${linearUserName}"`);
}

async function main(): Promise<void> {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) {
    throw new Error("GITHUB_EVENT_PATH environment variable is required");
  }

  const eventData: GitHubIssueEvent = require(eventPath);
  const { action, issue, label } = eventData;

  console.log(`Processing GitHub issue event: ${action}`);
  console.log(`Issue #${issue.number}: ${issue.title}`);

  const client = await getLinearClient();
  const teamId = await getTeamId(client);

  switch (action) {
    case "opened":
      await createLinearIssue(client, eventData, teamId);
      break;

    case "closed":
      await updateLinearIssueStatus(client, eventData, teamId, STATUS_NAMES.done);
      break;

    case "reopened":
      await updateLinearIssueStatus(client, eventData, teamId, STATUS_NAMES.todo);
      break;

    case "labeled":
      if (label?.name.toLowerCase() === "in progress") {
        await updateLinearIssueStatus(
          client,
          eventData,
          teamId,
          STATUS_NAMES.inProgress
        );
      }
      break;

    case "assigned":
      await updateLinearIssueAssignee(client, eventData, teamId);
      break;

    default:
      console.log(`Unhandled action: ${action}`);
  }
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
