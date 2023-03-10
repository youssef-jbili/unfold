import type { DetailedUserInfo, Issue } from '../../types/entities';
import type { GitlabIssue, GitlabUser } from '../../types/GitlabIssue';

const mapAssignee = ({
  avatar_url,
  id,
  name,
  username,
  web_url,
}: GitlabUser): DetailedUserInfo => ({
  id,
  avatarUrl: avatar_url,
  name,
  username,
  webUrl: web_url,
});

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
      assignees: assignees.map(mapAssignee),
      description,
    })
  );
