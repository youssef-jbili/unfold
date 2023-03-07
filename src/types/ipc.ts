import type { Issue, UserInfo } from './entities';

export enum Channel {
  // Token
  AddToken = 'add-token',
  CheckToken = 'check-token',
  HasToken = 'has-token',
  // Issues
  GetGitlabIssues = 'get-gitlab-issues',
  // Window management
  OpenSideWindow = 'open-side-window',
}

export interface CheckTokenMessage {
  token: string;
}

export interface CheckTokenResponse {
  userInfo?: UserInfo | null;
}

export interface AddTokenMessage {
  token: string;
}

export interface HasTokenResponse {
  hasToken: boolean;
}

export interface GetGitlabIssuesMessage {
  label: string;
}

export interface GetGitlabIssuesResponse {
  issues: Issue[];
}
