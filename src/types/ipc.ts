import type { Issue, UserInfo } from './entities';
import { PublicStore } from './store';

export enum Channel {
  // Token
  AddToken = 'add-token',
  CheckToken = 'check-token',
  HasToken = 'has-token',
  // Issues
  StartFetchGitlabIssues = 'start-fetch-gitlab-issues',
  // Window management
  OpenSideWindow = 'open-side-window',
  // Network
  GetNetworkStatus = 'get-network-status',
  // Settings
  GetSettings = 'get-settings',
}

export type Unsubscriber = () => void;

export enum EventType {
  IssuesFetch = 'issues-fetch',
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

export type GetSettingsResponse = PublicStore;
