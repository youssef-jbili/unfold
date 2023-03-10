export interface Label {
  id: number;
  name: string;
  color: string;
  textColor: string;
}

export interface CardDisplay {
  transparent: boolean;
}

export interface UserInfo {
  name: string;
  avatarUrl: string;
}

export interface DetailedUserInfo extends UserInfo {
  id: number;
  username: string;
  webUrl: string;
}

export interface Issue {
  id: number;
  title: string;
  issueId: number;
  weight?: number | null;
  labels: Label[];
  order: number;
  assignees: DetailedUserInfo[];
  description: string;
  display?: CardDisplay;
}

export interface IssueDetailsConfig {
  highlightStrong: boolean;
}
