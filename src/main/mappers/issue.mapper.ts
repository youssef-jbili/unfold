import type { Issue } from '../../types/entities';
import type { GitlabIssue } from '../../types/GitlabIssue';

export const mapGitlabIssueToIssue = (gitlabIssues: GitlabIssue[]): Issue[] =>
  gitlabIssues.map(
    ({ id, iid, weight, title, labels, assignees, description }, index) => ({
      id,
      title,
      issueId: iid,
      weight,
      order: index,
      labels: labels.map((label) => ({
        id: label.id,
        name: label.name,
        color: label.color,
        textColor: label.text_color,
      })),
      assignees: assignees.map((x) => x.id),
      description,
    })
  );
