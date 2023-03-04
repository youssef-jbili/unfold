export enum GitlabIssueState {
  open = 'open',
  closed = 'closed',
}

export interface GitlabUser {
  id: number;
  username: string;
  name: string;
  avatar_url: string;
  web_url: string;
}

export interface GitlabIssueReference {
  short: string;
  relative: string;
  full: string;
}

export interface GitlabLabel {
  id: number;
  color: string;
  text_color: string;
  name: string;
  is_project_label: boolean;
}

export interface GitlabIssue {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: GitlabIssueState;
  created_at: string;
  updated_at: string | null;
  closed_at: string | null;
  closed_by: string | null;
  labels: GitlabLabel[];
  assignees: GitlabUser[];
  author: GitlabUser;
  merge_request_count: number;
  web_url: string;
  weight: number | null;
  blocking_issues_count: number;
  reference: GitlabIssueReference;
}
