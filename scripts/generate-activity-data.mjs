import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const OUTPUT_PATH = path.join(process.cwd(), "public", "data", "activity.json");
const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const OWNER = "roiskhoiron";
const DISCUSSION_REPO = ".github";
const PROJECT_NUMBER = 9;

const STAGES = [
  { key: "todo", label: "Todo" },
  { key: "in_progress", label: "In Progress" },
  { key: "review_feedback", label: "Review/Feedback" },
  { key: "ready_validation", label: "Ready to Validation" },
  { key: "ready_handover", label: "Ready to Handover" },
  { key: "unknown", label: "Unmapped" },
];

function toStatusKey(value) {
  const raw = (value || "").trim().toLowerCase();
  if (!raw) return "unknown";
  if (raw.includes("todo") || raw.includes("to do") || raw.includes("backlog")) return "todo";
  if (raw.includes("progress") || raw.includes("doing") || raw.includes("active")) return "in_progress";
  if (raw.includes("review") || raw.includes("feedback")) return "review_feedback";
  if (raw.includes("valid") || raw.includes("qa") || raw.includes("test")) return "ready_validation";
  if (raw.includes("handover") || raw.includes("done") || raw.includes("complete") || raw.includes("release")) {
    return "ready_handover";
  }
  return "unknown";
}

function normalizeProjectItem(item) {
  const statusField = item.fieldValues?.nodes?.find(
    (node) => node?.field?.name?.toLowerCase() === "status" && node?.name,
  );

  const statusName = statusField?.name || "Unknown";
  const statusKey = toStatusKey(statusName);

  const content = item.content || {};
  const contentType = content.__typename || "DraftIssue";
  const title = content.title || item.fieldValues?.nodes?.find((n) => n?.text)?.text || "Untitled";

  return {
    id: item.id,
    source: "project",
    sourceType: contentType,
    title,
    url: content.url || `https://github.com/users/${OWNER}/projects/${PROJECT_NUMBER}`,
    number: content.number || null,
    state: content.state || "OPEN",
    status: statusName,
    statusKey,
    updatedAt: content.updatedAt || item.updatedAt,
    repository: content.repository?.nameWithOwner || null,
    labels: content.labels?.nodes?.map((label) => label.name) || [],
  };
}

function normalizeDiscussion(node) {
  return {
    id: node.id,
    source: "discussion",
    sourceType: "Discussion",
    title: node.title,
    url: node.url,
    number: node.number,
    state: node.closed ? "CLOSED" : "OPEN",
    status: node.category?.name || "Discussion",
    statusKey: "review_feedback",
    updatedAt: node.updatedAt,
    repository: `${OWNER}/${DISCUSSION_REPO}`,
    labels: node.labels?.nodes?.map((label) => label.name) || [],
    comments: node.comments?.totalCount || 0,
  };
}

function buildFunnel(items) {
  const counts = STAGES.reduce((acc, stage) => {
    acc[stage.key] = 0;
    return acc;
  }, {});

  for (const item of items) {
    counts[item.statusKey] = (counts[item.statusKey] || 0) + 1;
  }

  return STAGES.map((stage) => ({
    key: stage.key,
    label: stage.label,
    count: counts[stage.key] || 0,
  }));
}

async function runGraphqlQuery(token, query, variables = {}) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "activity-exporter",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GraphQL HTTP ${response.status}: ${body.slice(0, 500)}`);
  }

  const json = await response.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join(" | "));
  }

  return json.data;
}

async function readExistingFallback() {
  try {
    const raw = await readFile(OUTPUT_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function main() {
  const token = process.env.GH_ACTIVITY_TOKEN || process.env.GITHUB_TOKEN;
  const warnings = [];
  const existingSnapshot = await readExistingFallback();

  const query = `
    query ActivityData($owner: String!, $repo: String!, $projectNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        discussions(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }) {
          nodes {
            id
            number
            title
            url
            updatedAt
            closed
            category { name }
            labels(first: 10) { nodes { name } }
            comments { totalCount }
          }
        }
      }
      user(login: $owner) {
        projectV2(number: $projectNumber) {
          title
          url
          items(first: 50, orderBy: { field: UPDATED_AT, direction: DESC }) {
            nodes {
              id
              updatedAt
              fieldValues(first: 20) {
                nodes {
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    name
                    field { ... on ProjectV2FieldCommon { name } }
                  }
                  ... on ProjectV2ItemFieldTextValue {
                    text
                    field { ... on ProjectV2FieldCommon { name } }
                  }
                }
              }
              content {
                __typename
                ... on Issue {
                  number
                  title
                  url
                  state
                  updatedAt
                  repository { nameWithOwner }
                  labels(first: 10) { nodes { name } }
                }
                ... on PullRequest {
                  number
                  title
                  url
                  state
                  updatedAt
                  repository { nameWithOwner }
                  labels(first: 10) { nodes { name } }
                }
                ... on DraftIssue {
                  title
                  body
                }
              }
            }
          }
        }
      }
    }
  `;

  let data = null;
  if (!token) {
    warnings.push("No token found, using existing snapshot data.");
    data = existingSnapshot;
  } else {
    try {
      data = await runGraphqlQuery(token, query, {
        owner: OWNER,
        repo: DISCUSSION_REPO,
        projectNumber: PROJECT_NUMBER,
      });
    } catch (error) {
      if (existingSnapshot) {
        warnings.push(`Live fetch failed, using existing snapshot: ${error.message}`);
        data = existingSnapshot;
      } else {
        throw error;
      }
    }
  }

  const discussions = data?.repository?.discussions?.nodes?.map(normalizeDiscussion) || data?.discussions || [];
  const projectItems = data?.user?.projectV2?.items?.nodes?.map(normalizeProjectItem) || data?.projectItems || [];

  const payload = {
    generatedAt: new Date().toISOString(),
    owner: OWNER,
    discussionRepo: `${OWNER}/${DISCUSSION_REPO}`,
    project: {
      number: PROJECT_NUMBER,
      title: data?.user?.projectV2?.title || data?.project?.title || "Activity Board",
      url:
        data?.user?.projectV2?.url ||
        data?.project?.url ||
        `https://github.com/users/${OWNER}/projects/${PROJECT_NUMBER}`,
    },
    funnel: buildFunnel(projectItems),
    projectItems,
    discussions,
    warnings,
  };

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(
    `Activity data generated: ${projectItems.length} project items, ${discussions.length} discussions`,
  );
}

main().catch((error) => {
  console.error("Failed to generate activity data.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
